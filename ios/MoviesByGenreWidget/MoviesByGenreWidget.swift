import WidgetKit
import SwiftUI

struct MoviesByGenreWidgetEntry: TimelineEntry {
  let date: Date
  let welcomeMessage: String
  let movieTitle: String
  let moviePoster: Data
}

let welcomeMessage = "What about this comedy movie?"
let movieTitle = "Free Guy"
let posterUrl = "https://image.tmdb.org/t/p/w300/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
let moviePoster = try! Data(contentsOf: URL(string: posterUrl)!)

let genre: Genre = getFavoriteGenre()

struct MoviesByGenreWidgetProvider: TimelineProvider {
  func placeholder(in context: Context) -> MoviesByGenreWidgetEntry {
    MoviesByGenreWidgetEntry(
      date: Date(),
      welcomeMessage: welcomeMessage,
      movieTitle: movieTitle,
      moviePoster: moviePoster
    )
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MoviesByGenreWidgetEntry) -> ()) {
    let entry = MoviesByGenreWidgetEntry(
      date: Date(),
      welcomeMessage: welcomeMessage,
      movieTitle: movieTitle,
      moviePoster: moviePoster
    )
    
    completion(entry)
  }
  
  func getImage(url: String) -> Data {
    let imgData = try! Data(contentsOf: URL(string: url)!)

    return imgData
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    var entries: [MoviesByGenreWidgetEntry] = []
    
    let currentDate = Date()
    for hourOffset in 0 ..< 5 {
      let entryDate = Calendar.current.date(
        byAdding: .minute,
        value: hourOffset,
        to: currentDate
      )!
      
      Network.shared.apollo.fetch(query: MoviesByGenreQuery(genreId: genre.id)) { result in
        switch result {
        case .success(let graphQLResult):
          if let result = graphQLResult.data?.moviesByGenre {
            let movies = result.compactMap{$0}
            
            let randomMovie = movies.randomElement()

            let entry = MoviesByGenreWidgetEntry(
              date: entryDate,
              welcomeMessage: "What about this \(genre.name.lowercased()) movie?",
              movieTitle: (randomMovie?.title)!,
              moviePoster: getImage(url: randomMovie?.backdropPath ?? "")
            )
            
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            
            entries.append(entry)
            completion(timeline)
          }
        case .failure(let error):
          print("Failure! Error: \(error)")
          
          let entry = MoviesByGenreWidgetEntry(
            date: entryDate,
            welcomeMessage: genre.name,
            movieTitle: "Failure",
            moviePoster: moviePoster
          )
          
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          
          entries.append(entry)
          completion(timeline)
        }
      }
    }
  }
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: MoviesByGenreWidgetProvider.Entry
  
  var body: some View {
    MoviesByGenreSmallWidget(
      welcomeMessage: entry.welcomeMessage,
      movieTitle: entry.movieTitle,
      moviePoster: entry.moviePoster
    )
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
