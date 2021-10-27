import Foundation

public enum KeychainManagerError: Error, Equatable {
  case noItemFound
  case unexpectedData
  case unhandledError(status: OSStatus)
}

public class KeychainManager: KeychainManagerProtocol {
  private let keychain: KeychainProtocol
  
  public init(keychain: KeychainProtocol = Keychain()) {
    self.keychain = keychain
  }
  
  public func readValue(_ item: Queryable) throws -> String {
    var query = item.query
    query[kSecMatchLimit as String] = kSecMatchLimitOne
    query[kSecReturnAttributes as String] = kCFBooleanTrue
    query[kSecReturnData as String] = kCFBooleanTrue
    
    let keychainResponse = keychain.fetch(query)
    
    guard keychainResponse.status != errSecItemNotFound else {
      throw KeychainManagerError.noItemFound
    }
    
    guard keychainResponse.status == noErr else {
      throw KeychainManagerError.unhandledError(status: keychainResponse.status)
    }
    
    guard let existingItem = keychainResponse.queryResult as? [String: AnyObject],
          let data = existingItem[kSecValueData as String] as? Data,
          let value = String(data: data, encoding: String.Encoding.utf8) else {
            throw KeychainManagerError.unexpectedData
          }
    
    return value
  }
  
  public func saveValue(_ value: String, to item: Queryable) throws {
    let encodedValue = value.data(using: String.Encoding.utf8)!
    
    do {
      try _ = readValue(item)
      
      var attributesToUpdate = [String: AnyObject]()
      attributesToUpdate[kSecValueData as String] = encodedValue as AnyObject?
      
      let status =  keychain.update(item.query, with: attributesToUpdate)
      
      guard status == noErr else {
        throw KeychainManagerError.unhandledError(status: status)
      }
    } catch KeychainManagerError.noItemFound {
      var newItem = item.query
      newItem[kSecValueData as String] = encodedValue as AnyObject?
      
      let status = keychain.add(newItem)
      
      guard status == noErr else {
        throw KeychainManagerError.unhandledError(status: status)
      }
    }
  }
  
  public func deleteItem(_ item: Queryable) throws {
    let status = keychain.delete(item.query)
    
    guard status == noErr || status == errSecItemNotFound else {
      throw KeychainManagerError.unhandledError(status: status)
    }
  }
}
