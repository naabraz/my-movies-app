// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class MoviesByGenreQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query moviesByGenre($genreId: Int!) {
      moviesByGenre(genreId: $genreId) {
        __typename
        id
        title
        posterPath
        backdropPath
        overview
        releaseDate
        voteAverage
      }
    }
    """

  public let operationName: String = "moviesByGenre"

  public var genreId: Int

  public init(genreId: Int) {
    self.genreId = genreId
  }

  public var variables: GraphQLMap? {
    return ["genreId": genreId]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Query"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("moviesByGenre", arguments: ["genreId": GraphQLVariable("genreId")], type: .list(.object(MoviesByGenre.selections))),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(moviesByGenre: [MoviesByGenre?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "moviesByGenre": moviesByGenre.flatMap { (value: [MoviesByGenre?]) -> [ResultMap?] in value.map { (value: MoviesByGenre?) -> ResultMap? in value.flatMap { (value: MoviesByGenre) -> ResultMap in value.resultMap } } }])
    }

    public var moviesByGenre: [MoviesByGenre?]? {
      get {
        return (resultMap["moviesByGenre"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [MoviesByGenre?] in value.map { (value: ResultMap?) -> MoviesByGenre? in value.flatMap { (value: ResultMap) -> MoviesByGenre in MoviesByGenre(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [MoviesByGenre?]) -> [ResultMap?] in value.map { (value: MoviesByGenre?) -> ResultMap? in value.flatMap { (value: MoviesByGenre) -> ResultMap in value.resultMap } } }, forKey: "moviesByGenre")
      }
    }

    public struct MoviesByGenre: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["Movie"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .scalar(Int.self)),
          GraphQLField("title", type: .scalar(String.self)),
          GraphQLField("posterPath", type: .scalar(String.self)),
          GraphQLField("backdropPath", type: .scalar(String.self)),
          GraphQLField("overview", type: .scalar(String.self)),
          GraphQLField("releaseDate", type: .scalar(String.self)),
          GraphQLField("voteAverage", type: .scalar(Double.self)),
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: Int? = nil, title: String? = nil, posterPath: String? = nil, backdropPath: String? = nil, overview: String? = nil, releaseDate: String? = nil, voteAverage: Double? = nil) {
        self.init(unsafeResultMap: ["__typename": "Movie", "id": id, "title": title, "posterPath": posterPath, "backdropPath": backdropPath, "overview": overview, "releaseDate": releaseDate, "voteAverage": voteAverage])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: Int? {
        get {
          return resultMap["id"] as? Int
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var title: String? {
        get {
          return resultMap["title"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "title")
        }
      }

      public var posterPath: String? {
        get {
          return resultMap["posterPath"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "posterPath")
        }
      }

      public var backdropPath: String? {
        get {
          return resultMap["backdropPath"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "backdropPath")
        }
      }

      public var overview: String? {
        get {
          return resultMap["overview"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "overview")
        }
      }

      public var releaseDate: String? {
        get {
          return resultMap["releaseDate"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "releaseDate")
        }
      }

      public var voteAverage: Double? {
        get {
          return resultMap["voteAverage"] as? Double
        }
        set {
          resultMap.updateValue(newValue, forKey: "voteAverage")
        }
      }
    }
  }
}
