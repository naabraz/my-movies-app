import XCTest

@testable import My_Movies

class KeychainManagerTests: XCTestCase {
  let mockKeychain = MockKeychain()
  lazy var sut = KeychainManager(keychain: mockKeychain) // sut = System Under Test
  
  let item = GenericPasswordItem(
    service: "Service",
    account: "Account",
    accessGroup: "Group"
  )
  
  override func tearDown() {
    super.tearDown()
    mockKeychain.clearData()
  }
  
  func testReadValue_whenItemExists_unhandledError() {
    mockKeychain.osStatus = errSecInvalidValue
        
    XCTAssertThrowsError(try sut.readValue(item))
  }
  
  func testReadValue_whenItemExists_invalidValue() {
    mockKeychain.keychainResult = KeychainResult(
      status: noErr,
      queryResult: [kSecValueData: nil] as AnyObject
    )

    XCTAssertThrowsError(try sut.readValue(item))
  }
  
  func testSaveValue_whenItemExist_valueUpdated() {
    mockKeychain.keychainResult = KeychainResult(
      status: noErr,
      queryResult: [kSecValueData: "12345".data(using: .utf8)] as AnyObject
    )
    
    XCTAssertNoThrow(try sut.saveValue("10", to: item))
    XCTAssertEqual((mockKeychain.attributesToUpdate[kSecValueData as String] as? Data),
                   "10".data(using: String.Encoding.utf8)
    )
  }
  
  func testSaveValue_whenItemExist_unhandledError() {
    mockKeychain.osStatus = errSecInvalidValue
    mockKeychain.keychainResult = KeychainResult(
      status: noErr,
      queryResult: [kSecValueData: "12345".data(using: .utf8)] as AnyObject
    )
    
    XCTAssertThrowsError(try sut.saveValue("10", to: item))
  }
  
  func testSaveValue_whenItemDoesntExist_valueAdded() {
    mockKeychain.keychainResult = KeychainResult(
      status: errSecItemNotFound,
      queryResult: [kSecValueData: "12345".data(using: .utf8)] as AnyObject
    )

    XCTAssertNoThrow(try sut.saveValue("10", to: item))
    XCTAssertEqual((mockKeychain.query[kSecValueData as String] as? Data),
                   "10".data(using: String.Encoding.utf8)
    )
  }
  
  func testSaveValue_whenItemDoesntExist_unhandledError() {
    mockKeychain.osStatus = errSecInvalidValue

    mockKeychain.keychainResult = KeychainResult(
      status: errSecItemNotFound,
      queryResult: [kSecValueData: "12345".data(using: .utf8)] as AnyObject
    )

    XCTAssertThrowsError(try sut.saveValue("10", to: item))
  }
  
  func testDeleteItem_whenItemNoExist_deleteItemSucceeded() {
    mockKeychain.osStatus = errSecItemNotFound

    XCTAssertNoThrow(try sut.deleteItem(item))
  }
  
  func testDeleteItem_whenItemNoExist_unhandledError() {
    mockKeychain.osStatus = errSecInvalidValue

    XCTAssertThrowsError(try sut.deleteItem(item))
  }
}
