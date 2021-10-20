import WidgetKit
import SwiftUI

struct MoviesByGenreWidgetEntry: TimelineEntry {
  let date: Date
  let genreMovie: String
}

let genre: Genre = getFavoriteGenre()

struct MoviesByGenreWidgetProvider: TimelineProvider {
  func placeholder(in context: Context) -> MoviesByGenreWidgetEntry {
    MoviesByGenreWidgetEntry(date: Date(), genreMovie: getMoviesByGenreMock(genreId: genre.id))
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MoviesByGenreWidgetEntry) -> ()) {
    let entry = MoviesByGenreWidgetEntry(date: Date(), genreMovie: getMoviesByGenreMock(genreId: genre.id))
    completion(entry)
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var entries: [MoviesByGenreWidgetEntry] = []
    
    // Generate a timeline consisting of five entries an hour apart, starting from the current date.
    let currentDate = Date()
    for hourOffset in 0 ..< 5 {
      let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
      let entry = MoviesByGenreWidgetEntry(date: entryDate, genreMovie: getMoviesByGenreMock(genreId: genre.id))
      entries.append(entry)
    }
    
    let timeline = Timeline(entries: entries, policy: .atEnd)
    completion(timeline)
  }
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: MoviesByGenreWidgetProvider.Entry

  var body: some View {
    VStack {
      Text("Genre: \(genre.name)")
      Text("Movie: \(entry.genreMovie)")
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
