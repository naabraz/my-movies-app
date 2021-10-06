import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
}

func getFavoriteGenre() -> String {
  do {
    let value = try getValueFromKeychain(account: "FAVORITE_GENRES")
    
    print("---getValueFromKeychain", value)
  } catch KeychainError.itemNotFound {
    print("---getValueFromKeychain itemNotFound")
    return "itemNotFound";
  } catch KeychainError.unexpectedValueData {
    print("---getValueFromKeychain unexpectedValueData")
    return "unexpectedValueData";
  } catch KeychainError.unhandledError {
    print("---getValueFromKeychain unhandledError")
    return "unhandledError";
  } catch {
    print("---getValueFromKeychain genericError")
    return "genericError";
  }
  
  return "Horror"
}

struct MoviesByGenreWidgetEntryView : View {
  var entry: Provider.Entry
  let genre: String = getFavoriteGenre()

    var body: some View {
        Text(entry.date, style: .time)
        Text(genre)
    }
}

@main
struct MoviesByGenreWidget: Widget {
    let kind: String = "MoviesByGenreWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            MoviesByGenreWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}
