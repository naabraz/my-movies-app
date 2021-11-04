import Foundation

public protocol Queryable {
  var query: [String: AnyObject] { get }
}

public struct GenericPasswordItem {
  let service: String
  let account: String
  let accessGroup: String
  
  public init(service: String, account: String, accessGroup: String) {
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
    query[kSecAttrAccessGroup as String] = accessGroup as AnyObject
    query[kSecAttrAccount as String] = account as AnyObject
        
    return query
  }
}
