import Foundation

enum KeychainError: Error {
  case unexpectedValueData
  case unhandledError(status: OSStatus)
  case itemNotFound
}

let appIdentifier = Bundle.main.infoDictionary!["AppIdentifierPrefix"] as! String
let service = appIdentifier+"br.com.nataliabraz.MyMoviesApp"
let accessGroup = "group.com.nataliabraz"

func getValueFromKeychain(account: String) throws -> String {
  let query: NSMutableDictionary = [kSecClass: kSecClassGenericPassword,
                                    kSecAttrService: service,
                                    kSecAttrAccount: account,
                                    kSecAttrSynchronizable: kSecAttrSynchronizableAny,
                                    kSecReturnData: true,
                                    kSecReturnAttributes: true,
                                    kSecAttrAccessGroup: accessGroup]
  
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

func setValueOnKeychain(account: String, value: String) throws -> Void {
  let query: NSMutableDictionary = [
    kSecClass: kSecClassGenericPassword,
    kSecAttrAccount: account,
    kSecAttrService: service,
    kSecValueData: value.data(using: .utf8)!,
    kSecAttrAccessGroup: accessGroup]
  
  var status = SecItemDelete(query as CFDictionary)
  status = SecItemAdd(query as CFDictionary, nil)
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
}

func deleteValueFromKeychain(account: String) throws -> Void {
  let query: NSMutableDictionary = [
    kSecClass: kSecClassGenericPassword,
    kSecAttrAccount: account,
    kSecAttrService: service,
    kSecAttrAccessGroup: accessGroup]
  
  let status = SecItemDelete(query as CFDictionary)
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
}
