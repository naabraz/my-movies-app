import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
}

struct GenreList {
  var id: Int = 0
  var name: String = ""
}

var list:Array<GenreList> = []

func parseJson(anyObj:AnyObject) -> Array<GenreList> {
  var list:Array<GenreList> = []
  
  if anyObj is Array<AnyObject> {
    var genreList:GenreList = GenreList()
    
    for json in anyObj as! Array<AnyObject> {
      genreList.name = (json["name"] as AnyObject? as? String) ?? ""
      genreList.id = (json["id"] as AnyObject? as? Int) ?? 0
      
      list.append(genreList)
    }
  }

  return list
}

func getFavoriteGenre() -> String {
  do {
    let value = try getValueFromKeychain(account: "FAVORITE_GENRES")
    
    let data: Data = value.data(using: String.Encoding.utf8, allowLossyConversion: false)!

    let anyObj: AnyObject? = try! JSONSerialization.jsonObject(with: data) as AnyObject

    list = parseJson(anyObj: anyObj!)
    let genre = list.first ?? nil
    
    return genre?.name ?? "Generic Value"
  } catch KeychainError.itemNotFound {
    return "itemNotFound"
  } catch KeychainError.unexpectedValueData {
    return "unexpectedValueData"
  } catch KeychainError.unhandledError {
    return "unhandledError"
  } catch {
    return "genericError"
  }
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: Provider.Entry
  let genre: String = getFavoriteGenre()

    var body: some View {
      Text("Favorite: ")
        .bold()
      +
      Text(genre)
    }
}

@main
struct MoviesByGenreWidget: Widget {
    let kind: String = "MoviesByGenreWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            MoviesByGenreWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Favorite Genre Movies")
        .description("Random movies from your favorite genre.")
    }
}
