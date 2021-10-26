import Foundation

public protocol Queryable {
  var query: [String: AnyObject] { get }
}
