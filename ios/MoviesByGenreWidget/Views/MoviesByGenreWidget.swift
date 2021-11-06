import SwiftUI
import WidgetKit

struct MoviesByGenreWidgetView: View {
  let movie: Movie
  let favoriteGenre: String
  
  @Environment(\.widgetFamily) var family: WidgetFamily
  
  @ViewBuilder
  var body: some View {
    if (family == .systemSmall) {
      MoviesByGenreSmallWidget(movie: movie)
    }

    if (family == .systemMedium) {
      MoviesByGenreMediumWidget(movie: movie, favoriteGenre: favoriteGenre)
    }
  }
}
