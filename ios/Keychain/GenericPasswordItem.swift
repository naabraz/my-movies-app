import Foundation

public struct GenericPasswordItem {
  let service: String
  let account: String?
  let accessGroup: String?
  
  public init(service: String, account: String?, accessGroup: String?) {
    self.service = service
    self.account = account
    self.accessGroup = accessGroup
  }
}

extension GenericPasswordItem: Queryable {
  public var query: [String: AnyObject] {
    var query = [String: AnyObject]()
    
    query[kSecClass as String] = kSecClassGenericPassword
    query[kSecAttrService as String] = service as AnyObject
    
    if let account = account {
      query[kSecAttrAccount as String] = account as AnyObject
    }
    
    if let accessGroup = accessGroup {
      query[kSecAttrAccessGroup as String] = accessGroup as AnyObject
    }
    
    query [kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
    
    return query
  }
}
