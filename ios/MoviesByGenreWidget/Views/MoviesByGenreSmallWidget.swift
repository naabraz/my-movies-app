import WidgetKit
import SwiftUI

struct MoviesByGenreSmallWidget: View {
  let welcomeMessage: String
  let movieTitle: String
  let moviePoster: Data
  
  var body: some View {
    HStack {
      Text("🍿\(welcomeMessage)")
      Text("✨\(movieTitle)")
    }
    .padding(4)
    .background(Color.black)
    .opacity(0.8)
    .foregroundColor(Color.white)
    .font(.caption)
    .background(Image(uiImage: UIImage(data: moviePoster)!)
                  .scaledToFill())
  }
  
  struct Widget_Previews: PreviewProvider {
    static var previews: some View {
      Group {
        MoviesByGenreSmallWidget(
          welcomeMessage: "How about this comedy?",
          movieTitle: "The Last Warrior: Root of Evil",
          moviePoster: try! Data(contentsOf: URL(string: "https://image.tmdb.org/t/p/w300/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg")!)
        ).previewContext(WidgetPreviewContext(family: .systemSmall))
      }
    }
  }
}

