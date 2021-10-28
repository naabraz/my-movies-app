import XCTest

@testable import My_Movies

class KeychainManagerTests: XCTestCase {
  let mockKeychain = MockKeychain()
  lazy var sut = KeychainManager(keychain: mockKeychain)
  
  override func tearDown() {
    super.tearDown()
    mockKeychain.clearData()
  }
  
  func testSaveValue_whenItemExist_valueUpdated() {
    mockKeychain.keychainResult = KeychainResult(
      status: noErr,
      queryResult: [kSecValueData: "12345".data(using: .utf8)] as AnyObject
    )

    let item = GenericPasswordItem(service: "",
                                   account: nil,
                                   accessGroup: nil)
    
    XCTAssertNoThrow(try sut.saveValue("10", to: item))
    XCTAssertEqual((mockKeychain.attributesToUpdate[kSecValueData as String] as? Data),
                   "10".data(using: String.Encoding.utf8)
    )
  }
  
  func testDeleteItem_whenItemNoExist_deleteItemSucceeded() {
    mockKeychain.osStatus = errSecItemNotFound
    
    let item = GenericPasswordItem(service: "", account: nil, accessGroup: nil)
    
    XCTAssertNoThrow(try sut.deleteItem(item))
  }
}
