import Foundation

enum KeychainError: Error {
  case unexpectedValueData
  case unhandledError(status: OSStatus)
  case itemNotFound
}

let appIdentifier = Bundle.main.infoDictionary!["AppIdentifierPrefix"] as! String
let service = appIdentifier+"br.com.nataliabraz.MyMoviesApp"
let accessGroup = "group.com.nataliabraz"

func setValueOnKeychain(account: String, value: String) throws -> Void {
  let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: account,
    kSecAttrService as String: service,
    kSecValueData as String: value.data(using: .utf8)!,
    kSecAttrAccessGroup as String: accessGroup
  ]
  
  let status = SecItemAdd(query as CFDictionary, nil)
  
  switch status {
  case errSecSuccess:
    break
  case errSecDuplicateItem:
    try updateKeychainValue(account: account, value: value)
  default:
    throw KeychainError.unhandledError(status: status)
  }
}

func updateKeychainValue(account: String, value: String) throws -> Void {
  let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: account,
    kSecAttrService as String: service
  ]
  
  let attributes: [String: Any] = [
    kSecValueData as String: value.data(using: .utf8)!
  ]
  
  let status = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
  
  guard status != errSecItemNotFound else {
    throw KeychainError.itemNotFound
  }
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
}

func getValueFromKeychain(account: String) throws -> String {
  let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: account,
    kSecAttrService as String: service,
    kSecMatchLimit as String: kSecMatchLimitOne,
    kSecReturnAttributes as String: true,
    kSecReturnData as String: true
  ]
  
  var item: CFTypeRef?
  let status = SecItemCopyMatching(query as CFDictionary, &item)
  
  guard status != errSecItemNotFound else {
    throw KeychainError.itemNotFound
  }
  
  guard status == errSecSuccess else {
    throw KeychainError.unhandledError(status: status)
  }
  
  guard
    let existingItem = item as? [String : Any],
    let valueData = existingItem[kSecValueData as String] as? Data,
    let value = String(data: valueData, encoding: .utf8)
  else {
    throw KeychainError.unexpectedValueData
  }
  
  return value
}

func deleteValueFromKeychain(account: String) throws -> Void {
  let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: account,
    kSecAttrService as String: service
  ]
  
  let status = SecItemDelete(query as CFDictionary)
  
  guard status == errSecSuccess || status == errSecItemNotFound else {
    throw KeychainError.unhandledError(status: status)
  }
}
