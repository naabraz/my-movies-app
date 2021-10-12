import Foundation
import Apollo

struct NetworkInterceptorProvider: InterceptorProvider {
  
  private let store: ApolloStore
  private let client: URLSessionClient
  
  init(store: ApolloStore,
       client: URLSessionClient) {
    self.store = store
    self.client = client
  }
  
  func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
    return [
      MaxRetryInterceptor(),
//      LegacyCacheReadInterceptor(store: self.store),
      UserManagementInterceptor(),
      RequestLoggingInterceptor(),
      NetworkFetchInterceptor(client: self.client),
      //            ResponseLoggingInterceptor(),
      ResponseCodeInterceptor(),
//      LegacyParsingInterceptor(cacheKeyForObject: self.store.cacheKeyForObject),
      AutomaticPersistedQueryInterceptor(),
//      LegacyCacheWriteInterceptor(store: self.store)
    ]
  }
}
