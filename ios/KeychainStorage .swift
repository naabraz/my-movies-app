import Foundation

enum KeychainError: Error {
  case unexpectedValueData
  case unhandledError(status: OSStatus)
  case itemNotFound
}

let appIdentifier = Bundle.main.infoDictionary!["AppIdentifierPrefix"] as! String

func getValueFromKeychain(account: String, service: String) throws -> String {
  let query: NSMutableDictionary = [kSecClass: kSecClassGenericPassword,
                                    kSecAttrService: appIdentifier+service,
                                    kSecAttrAccount: account,
                                    kSecAttrSynchronizable: kSecAttrSynchronizableAny,
                                    kSecReturnData: true,
                                    kSecReturnAttributes: true,
                                    kSecAttrAccessGroup: "group.com.nataliabraz"]
  
  var item: CFTypeRef?
  let status = SecItemCopyMatching(query as CFDictionary, &item)
  
  guard status != errSecItemNotFound else {
    throw KeychainError.itemNotFound
  }
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
  
  guard let existingItem = item as? [String : Any],
        let tokenData = existingItem[kSecValueData as String] as? Data,
        let token = String(data: tokenData, encoding: String.Encoding.utf8) else {
    throw KeychainError.unexpectedValueData
  }
  
  return token
}

func setValueOnKeychain(account: String,
                        service: String,
                        value: String) throws -> Void {
  
  let query: NSMutableDictionary = [
    kSecClass: kSecClassGenericPassword,
    kSecAttrAccount: account,
    kSecAttrService: appIdentifier+service,
    kSecValueData: value.data(using: .utf8)!,
    kSecAttrAccessGroup: "group.com.nataliabraz"]
  
  var status = SecItemDelete(query as CFDictionary)
  status = SecItemAdd(query as CFDictionary, nil)
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
}

func deleteValueFromKeychain(account: String,
                             service: String) throws -> Void {
  
  let query: NSMutableDictionary = [
    kSecClass: kSecClassGenericPassword,
    kSecAttrAccount: account,
    kSecAttrService: appIdentifier+service,
    kSecAttrAccessGroup: "group.com.nataliabraz"]
  
  let status = SecItemDelete(query as CFDictionary)
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
}
