import Foundation

public class Keychain: KeychainProtocol {
  public init() { }
  
  public func add(_ dictionary: [String: AnyObject]) -> OSStatus {
    return SecItemAdd(dictionary as CFDictionary, nil)
  }
  
  public func fetch(_ query: [String : AnyObject]) -> KeychainResult {
    var queryResult: AnyObject?
    
    let status = withUnsafeMutablePointer(to: &queryResult) {
      SecItemCopyMatching(query as CFDictionary, UnsafeMutablePointer($0))
    }
    
    return KeychainResult(status: status, queryResult: queryResult)
  }
  
  public func update(_ query: [String: AnyObject], with attributes: [String: AnyObject]) -> OSStatus {
    return SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
  }
  
  public func delete(_ query: [String: AnyObject]) -> OSStatus {
    return SecItemDelete(query as CFDictionary)
  }
}
