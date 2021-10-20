import WidgetKit
import SwiftUI

struct MoviesByGenreWidgetProvider: TimelineProvider {
  func placeholder(in context: Context) -> MoviesByGenreWidgetEntry {
    MoviesByGenreWidgetEntry(date: Date())
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MoviesByGenreWidgetEntry) -> ()) {
    let entry = MoviesByGenreWidgetEntry(date: Date())
    completion(entry)
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var entries: [MoviesByGenreWidgetEntry] = []
    
    // Generate a timeline consisting of five entries an hour apart, starting from the current date.
    let currentDate = Date()
    for hourOffset in 0 ..< 5 {
      let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
      let entry = MoviesByGenreWidgetEntry(date: entryDate)
      entries.append(entry)
    }
    
    let timeline = Timeline(entries: entries, policy: .atEnd)
    completion(timeline)
  }
}

struct MoviesByGenreWidgetEntry: TimelineEntry {
  let date: Date
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: MoviesByGenreWidgetProvider.Entry
  
  let genre: Genre = getFavoriteGenre()
  
  @State var moviesList = [Movie]()
    
  var body: some View {
    VStack {
      Text("Genre: \(genre.name)")
      Text("Movie: \(self.moviesList.first?.title ?? "Default")")
      Text("Size: \(self.moviesList.count)")
    }.onAppear {
      getMoviesByGenre(genreId: genre.id)
    }
  }
}

@main
struct MoviesByGenreWidget: Widget {
  let kind: String = "MoviesByGenreWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: MoviesByGenreWidgetProvider()) { entry in
      MoviesByGenreWidgetEntryView(entry: entry)
    }
    .configurationDisplayName("Favorite Genre Movies")
    .description("Random movies from your favorite genre.")
  }
}
