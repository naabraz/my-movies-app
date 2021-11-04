import WidgetKit
import SwiftUI

struct MoviesByGenreWidgetEntry: TimelineEntry {
  let date: Date
  let moviePoster: Data
  let movieBackdrop: Data
}

let posterUrl = "https://image.tmdb.org/t/p/w92/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg"
let backdropUrl = "https://image.tmdb.org/t/p/w300/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
let moviePoster = try! Data(contentsOf: URL(string: posterUrl)!)
let movieBackdrop = try! Data(contentsOf: URL(string: backdropUrl)!)

let genre: Genre = getFavoriteGenre()

struct MoviesByGenreWidgetProvider: TimelineProvider {
  func placeholder(in context: Context) -> MoviesByGenreWidgetEntry {
    MoviesByGenreWidgetEntry(
      date: Date(),
      moviePoster: moviePoster,
      movieBackdrop: movieBackdrop
    )
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MoviesByGenreWidgetEntry) -> ()) {
    let entry = MoviesByGenreWidgetEntry(
      date: Date(),
      moviePoster: moviePoster,
      movieBackdrop: movieBackdrop
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
              moviePoster: getImage(url: randomMovie?.posterPath ?? ""),
              movieBackdrop: getImage(url: randomMovie?.backdropPath ?? "")
            )
            
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            
            entries.append(entry)
            completion(timeline)
          }
        case .failure(let error):
          print("Failure! Error: \(error)")
          
          let entry = MoviesByGenreWidgetEntry(
            date: entryDate,
            moviePoster: moviePoster,
            movieBackdrop: movieBackdrop
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
    MoviesByGenreSmallWidget(moviePoster: entry.moviePoster, movieBackdrop: entry.movieBackdrop)
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
