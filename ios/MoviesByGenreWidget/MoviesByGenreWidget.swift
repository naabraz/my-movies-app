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

struct Movie {
  var title: String = ""
}

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
    let value = try getValueFromKeychain(account: "FAVORITE_GENRES")
    
    let data: Data = value.data(using: String.Encoding.utf8, allowLossyConversion: false)!
    
    let anyObj: AnyObject? = try! JSONSerialization.jsonObject(with: data) as AnyObject
    
    list = parseJson(anyObj: anyObj!)
    let genre = list.first!
    
    return genre
  } catch KeychainError.itemNotFound {
    print("itemNotFound")
    return Genre(id: 0, name: "Generic")
  } catch KeychainError.unexpectedValueData {
    print("unexpectedValueData")
    return Genre(id: 0, name: "Generic")
  } catch KeychainError.unhandledError {
    print("unhandledError")
    return Genre(id: 0, name: "Generic")
  } catch {
    return Genre(id: 0, name: "Generic")
  }
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: Provider.Entry
  
  let genre: Genre = getFavoriteGenre()
  
  @State var moviesList = [Movie]()
    
  var body: some View {
    VStack {
      Text("Genre: \(genre.name)")
      Text("Movie: \(self.moviesList.first?.title ?? "Default")")
      Text("Size: \(self.moviesList.count)")
    }.onAppear {
      Network.shared.apollo.fetch(query: MoviesByGenreQuery(genreId: genre.id)) { result in
        switch result {
        case .success(let result):
          if let result = result.data?.moviesByGenre {
            let movies = result.compactMap{$0}

            movies.forEach { selectedMovie in
              self.moviesList.append(Movie(title: selectedMovie.title!))
            }
          }
        case .failure(let error):
          print("Failure! Error: \(error)")
        }
      }
    }
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
