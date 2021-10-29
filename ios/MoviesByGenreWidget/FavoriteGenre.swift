import Foundation

struct Genre {
  var id: Int = 0
  var name: String = ""
}

func parseJson(anyObj:AnyObject) -> Array<Genre> {
  var list:Array<Genre> = []
  
  if anyObj is Array<AnyObject> {
    var genreList:Genre = Genre()
    
    for json in anyObj as! Array<AnyObject> {
      genreList.name = (json["name"] as AnyObject? as? String) ?? ""
      genreList.id = (json["id"] as AnyObject? as? Int) ?? 0
      
      list.append(genreList)
    }
  }
  
  return list
}

func getFavoriteGenre() -> Genre {
  var list:Array<Genre> = []
  
  do {
    let Keychain = KeychainManager(keychain: Keychain())
    
    let item = GenericPasswordItem(service: service,
                                   account: "FAVORITE_GENRES",
                                   accessGroup: accessGroup)
    
    let value = try Keychain.readValue(item)

    let data: Data = value.data(using: String.Encoding.utf8, allowLossyConversion: false)!
    
    let anyObj: AnyObject? = try! JSONSerialization.jsonObject(with: data) as AnyObject
    
    list = parseJson(anyObj: anyObj!)
    let genre = list.first!
    
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
