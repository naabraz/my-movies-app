import WidgetKit
import SwiftUI

struct MoviesByGenreSmallWidget: View {
  let moviePoster: Data
  let movieBackdrop: Data
  
  var body: some View {
    ZStack {
      Image(uiImage: UIImage(data: moviePoster)!)
        .cornerRadius(5)
    }
    .background(
      Image(uiImage: UIImage(data: movieBackdrop)!)
        .blur(radius: 20)
    )
  }
}
