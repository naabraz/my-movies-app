import WidgetKit
import SwiftUI

struct Movie {
  let title: String
  let releaseYear: String
  let poster: Data
  let backdrop: Data
}

struct MoviesByGenreWidgetEntry: TimelineEntry {
  let date: Date
  let movie: Movie
  let favoriteGenre: String
}

let posterUrl = "https://image.tmdb.org/t/p/w92/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg"
let backdropUrl = "https://image.tmdb.org/t/p/w300/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
let moviePoster = try! Data(contentsOf: URL(string: posterUrl)!)
let movieBackdrop = try! Data(contentsOf: URL(string: backdropUrl)!)
let favoriteGenre = "Comedy"

let genre: Genre = getFavoriteGenre()

struct MoviesByGenreWidgetProvider: TimelineProvider {
  let defaultMovie = Movie(
    title: "Free Guy",
    releaseYear: "2021",
    poster: moviePoster,
    backdrop: movieBackdrop
  )
  
  func placeholder(in context: Context) -> MoviesByGenreWidgetEntry {
    MoviesByGenreWidgetEntry(
      date: Date(),
      movie: defaultMovie,
      favoriteGenre: favoriteGenre
    )
  }
  
  func getSnapshot(in context: Context, completion: @escaping (MoviesByGenreWidgetEntry) -> ()) {
    let entry = MoviesByGenreWidgetEntry(
      date: Date(),
      movie: defaultMovie,
      favoriteGenre: favoriteGenre
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
            
            let movie = Movie(
              title: randomMovie?.title ?? defaultMovie.title,
              releaseYear: randomMovie?.releaseDate ?? defaultMovie.releaseYear,
              poster: getImage(url: randomMovie?.posterPath ?? posterUrl),
              backdrop: getImage(url: randomMovie?.backdropPath ?? backdropUrl)
            )
            
            let entry = MoviesByGenreWidgetEntry(
              date: entryDate,
              movie: movie,
              favoriteGenre: genre.name
            )
            
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            
            entries.append(entry)
            completion(timeline)
          }
        case .failure(let error):
          print("Failure! Error: \(error)")
          
          let entry = MoviesByGenreWidgetEntry(
            date: entryDate,
            movie: defaultMovie,
            favoriteGenre: genre.name
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
    MoviesByGenreWidgetView(movie: entry.movie, favoriteGenre: entry.favoriteGenre)
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
    .supportedFamilies([.systemSmall, .systemMedium])
  }
}
