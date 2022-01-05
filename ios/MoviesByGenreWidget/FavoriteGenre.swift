import Foundation

struct Genre {
  var id: Int = 0
  var name: String = ""
}

func parseJson(json:AnyObject) -> Genre {
  var genre: Genre = Genre()
  
  genre.name = (json["name"] as AnyObject? as? String) ?? ""
  genre.id = (json["id"] as AnyObject? as? Int) ?? 0
  
  return genre
}

func getFavoriteGenre() -> Genre {
  do {
    let Keychain = KeychainManager(keychain: Keychain())
    
    let item = GenericPasswordItem(service: service,
                                   account: "FAVORITE_GENRES",
                                   accessGroup: accessGroup)
    
    let value = try Keychain.readValue(item)

    let data: Data = value.data(using: String.Encoding.utf8, allowLossyConversion: false)!
    
    let jsonData: AnyObject? = try! JSONSerialization.jsonObject(with: data) as AnyObject
    
    let genre = parseJson(json: jsonData!)
    
    return genre
  } catch KeychainManagerError.noItemFound {
    print("itemNotFound")
    return Genre(id: 0, name: "Generic")
  } catch KeychainManagerError.unexpectedData {
    print("unexpectedValueData")
    return Genre(id: 0, name: "Generic")
  } catch KeychainManagerError.unhandledError {
    print("unhandledError")
    return Genre(id: 0, name: "Generic")
  } catch {
    return Genre(id: 0, name: "Generic")
  }
}
