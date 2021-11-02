import WidgetKit
import SwiftUI

struct MoviesByGenreSmallWidget: View {
  let welcomeMessage: String
  let movieTitle: String
  
  var body: some View {
    VStack(alignment: .center, spacing: 10) {
      Text("🍿\(welcomeMessage)")
      Text("✨\(movieTitle)")
    }
    .font(.subheadline)
    .padding(8)
  }
}

struct Widget_Previews: PreviewProvider {
  static var previews: some View {
    Group {
      MoviesByGenreSmallWidget(
        welcomeMessage: "What about a comedy movie?",
        movieTitle: "The Last Warrior: Root of Evil"
      ).previewContext(WidgetPreviewContext(family: .systemSmall))
    }
  }
}
