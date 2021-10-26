import Foundation

public protocol KeychainManagerProtocol {
  func readValue(_ item: Queryable) throws -> String
  
  func saveValue(_ value: String, to item: Queryable) throws
  
  func deleteItem(_ item: Queryable) throws
}
