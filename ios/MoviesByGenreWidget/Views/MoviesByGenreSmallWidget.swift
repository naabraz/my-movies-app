import WidgetKit
import SwiftUI

struct MoviesByGenreSmallWidget: View {
  let movie: Movie

  var body: some View {
    ZStack {
      Image(uiImage: UIImage(data: movie.poster)!)
        .cornerRadius(5)
    }
    .background(
      Image(uiImage: UIImage(data: movie.backdrop)!)
        .blur(radius: 20)
    )
  }
}
