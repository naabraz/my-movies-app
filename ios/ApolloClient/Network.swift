import Foundation
import Apollo

class Network {
  static let shared = Network()
  
  private(set) lazy var apollo: ApolloClient = {
    let cache = InMemoryNormalizedCache()
    let store = ApolloStore(cache: cache)
    
    let client = URLSessionClient()
    let provider = NetworkInterceptorProvider(store: store, client: client)
    let url = URL(string: "https://nataliabraz.dev/mymovies/api")!
    
    let requestChainTransport = RequestChainNetworkTransport(interceptorProvider: provider,
                                                             endpointURL: url)
    
    return ApolloClient(networkTransport: requestChainTransport,
                        store: store)
  }()
}
