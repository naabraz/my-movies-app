import Foundation
import React
import WidgetKit

@objc(SecureStorage)
class SecureStorage: NSObject {

  @objc(getValue:resolver:rejecter:)
  func getValue(account: String,
                resolver resolve: RCTPromiseResolveBlock,
                rejecter reject: RCTPromiseRejectBlock) -> Void {

    do {
      let Keychain = KeychainManager(keychain: Keychain())

      let item = GenericPasswordItem(service: service,
                                     account: account,
                                     accessGroup: accessGroup)
      
      let value = try Keychain.readValue(item)
      
      resolve(value)
    } catch KeychainManagerError.noItemFound {
      reject("SecureStorage", "getValue: Item not found", nil);
    } catch KeychainManagerError.unexpectedData {
      reject("SecureStorage", "getValue: Unexpected value data", nil);
    } catch KeychainManagerError.unhandledError {
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
      let Keychain = KeychainManager(keychain: Keychain())
      
      let item = GenericPasswordItem(service: service,
                                     account: account,
                                     accessGroup: accessGroup)
      
      try Keychain.saveValue(value, to: item)

      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }

      resolve("Success")
    } catch KeychainManagerError.unhandledError {
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
      let Keychain = KeychainManager(keychain: Keychain())
      
      let item = GenericPasswordItem(service: service,
                                     account: account,
                                     accessGroup: accessGroup)

      try Keychain.deleteItem(item)

      resolve("Success")
    } catch KeychainManagerError.unhandledError {
      reject("SecureStorage", "deleteValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "deleteValue: Generic error", nil);
    }
  }
}
