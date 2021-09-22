import Foundation
import React

func getMoviesByGenre() {
  Network.shared.apollo.fetch(query: MoviesByGenreQuery(genreId: 28)) { result in
    switch result {
    case .success(let result):
      DispatchQueue.main.async {
        if let result = result.data?.moviesByGenre {
          let movies = result.compactMap{$0}
          
          movies.forEach { movie in
            print("===moviesByGenre", movie.title)
          }
        }
      }
    case .failure(let error):
      print("Failure! Error: \(error)")
    }
  }
}

@objc(SecureStorage)
class SecureStorage: NSObject {
  
  let bundleID = Bundle.main.bundleIdentifier
  
  @objc(getValue:resolver:rejecter:)
  func getValue(account: String,
                resolver resolve: RCTPromiseResolveBlock,
                rejecter reject: RCTPromiseRejectBlock) -> Void {
    getMoviesByGenre()

    do {
      let value = try getValueFromKeychain(account: account,
                                           service: bundleID!)
      
      resolve(value)
    } catch KeychainError.itemNotFound {
      reject("SecureStorage", "getValue: Item not found", nil);
    } catch KeychainError.unexpectedValueData {
      reject("SecureStorage", "getValue: Unexpected value data", nil);
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "getValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "getValue: Generic error", nil);
    }
  }
  
  @objc(setValue:value:resolver:rejecter:)
  func setValue(account: String,
                value: String,
                resolver resolve: RCTPromiseResolveBlock,
                rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    do {
      try setValueOnKeychain(account: account,
                             service: bundleID!,
                             value: value)
      resolve("Success")
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "setValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "setValue: Generic error", nil);
    }
  }
  
  @objc(deleteValue:resolver:rejecter:)
  func deleteValue(account: String,
                   resolver resolve: RCTPromiseResolveBlock,
                   rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    do {
      try deleteValueFromKeychain(account: account,
                                  service: bundleID!)
      resolve("Success")
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "deleteValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "deleteValue: Generic error", nil);
    }
  }
}
