import WidgetKit
import SwiftUI

struct MoviesByGenreMediumWidget: View {
  let movie: Movie
  let favoriteGenre: String
  
  var body: some View {
    let release: String = movie.releaseYear.components(separatedBy: "-").first!

    ZStack {
      HStack {
        VStack(alignment: .leading) {
          Text("🍿What about this \(favoriteGenre.lowercased()) movie today?")
            .foregroundColor(Color.white)
            .bold()
            .padding(.bottom)
          Text("✨\(movie.title) - \(release)")
            .font(.subheadline)
            .foregroundColor(Color.white)
            .bold()
        }
        Image(uiImage: UIImage(data: movie.poster)!)
          .cornerRadius(5)
      }
    }
    .padding(4)
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(
      Image(uiImage: UIImage(data: movie.backdrop)!)
        .resizable()
        .scaledToFill()
        .blur(radius: 10)
    )
  }
}
