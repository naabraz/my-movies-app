import Foundation
import Apollo

class UserManagementInterceptor: ApolloInterceptor {
  private func addTokenAndProceed<Operation: GraphQLOperation>(
    _ token: String,
    _ gcrypt: String,
    to request: HTTPRequest<Operation>,
    chain: RequestChain,
    response: HTTPResponse<Operation>?,
    completion: @escaping (Result<GraphQLResult<Operation.Data>, Error>) -> Void) {
      
      request.addHeader(name: "Authorization", value: "Bearer \(token)")
      request.addHeader(name: "gcrypt", value: "Gcrypt \(gcrypt)")
      chain.proceedAsync(request: request,
                         response: response,
                         completion: completion)
    }
  
  func interceptAsync<Operation: GraphQLOperation>(
    chain: RequestChain,
    request: HTTPRequest<Operation>,
    response: HTTPResponse<Operation>?,
    completion: @escaping (Result<GraphQLResult<Operation.Data>, Error>) -> Void) {
      
      self.addTokenAndProceed("My Bearer",
                              "My Gcrypt",
                              to: request,
                              chain: chain,
                              response: response,
                              completion: completion)
    }
}
