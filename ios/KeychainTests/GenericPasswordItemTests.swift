import XCTest

@testable import My_Movies

class GenericPasswordItemTests: XCTestCase {
  
  func testGenericPasswordItem_whenAccountAndAccessGroupExist() {
    let query = GenericPasswordItem(
      service: "TestService",
      account: "123",
      accessGroup: "TestAccessGroup"
    ).query
    
    XCTAssertEqual((query[kSecClass as String] as? String), kSecClassGenericPassword as String)
    XCTAssertEqual((query[kSecAttrService as String] as? String), "TestService")
    XCTAssertEqual((query[kSecAttrAccount as String] as? String), "123")
    XCTAssertEqual((query[kSecAttrAccessGroup as String] as? String), "TestAccessGroup")
  }
}
