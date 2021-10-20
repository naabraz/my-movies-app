import Foundation

struct Movie {
  var title: String = ""
}

func getMoviesByGenre(genreId: Int) {
  Network.shared.apollo.fetch(query: MoviesByGenreQuery(genreId: genreId)) { result in
    switch result {
    case .success(let result):
      if let result = result.data?.moviesByGenre {
        let movies = result.compactMap{$0}
        
        movies.forEach { selectedMovie in
          print(selectedMovie.title!)
        }
      }
    case .failure(let error):
      print("Failure! Error: \(error)")
    }
  }
}
