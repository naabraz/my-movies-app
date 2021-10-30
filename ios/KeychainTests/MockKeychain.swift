import Foundation

@testable import My_Movies

class MockKeychain: KeychainProtocol {
  var osStatus: OSStatus = 0
  var keychainResult = KeychainResult(status: 10, queryResult: nil)
  var query: [String: AnyObject] = [:]
  var attributesToUpdate: [String: AnyObject] = [:]
  
  func add(_ dictionary: [String : AnyObject]) -> OSStatus {
    self.query = dictionary
    
    return osStatus
  }
  
  func fetch(_ query: [String : AnyObject]) -> KeychainResult {
    self.query = query
    
    return keychainResult
  }
  
  func update(_ query: [String : AnyObject], with attributes: [String : AnyObject]) -> OSStatus {
    self.query = query
    self.attributesToUpdate = attributes
    
    return osStatus
  }
  
  func delete(_ query: [String : AnyObject]) -> OSStatus {
    self.query = query
    
    return osStatus
  }

  func clearData() {
    osStatus = 0
    keychainResult = KeychainResult(status: 0, queryResult: nil)
    query = [:]
    attributesToUpdate = [:]
  }
}
