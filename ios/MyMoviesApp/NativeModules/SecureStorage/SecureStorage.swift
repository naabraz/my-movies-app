import Foundation
import React
import WidgetKit

@objc(SecureStorage)
class SecureStorage: NSObject {
  
  let bundleID = Bundle.main.bundleIdentifier
  
  @objc(getValue:resolver:rejecter:)
  func getValue(account: String,
                resolver resolve: RCTPromiseResolveBlock,
                rejecter reject: RCTPromiseRejectBlock) -> Void {

    do {
      let value = try getValueFromKeychain(account: account)
      
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
      try setValueOnKeychain(account: account, value: value)

      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }

      resolve("Success")
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "setValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "setValue: Generic error", nil);
    }
  }
  
  @objc(updateValue:value:resolver:rejecter:)
  func updateValue(account: String,
                   value: String,
                   resolver resolve: RCTPromiseResolveBlock,
                   rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    do {
      try updateKeychainValue(account: account, value: value)
      
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }
      
      resolve("Success")
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "updateValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "updateValue: Generic error", nil);
    }
  }
  
  @objc(deleteValue:resolver:rejecter:)
  func deleteValue(account: String,
                   resolver resolve: RCTPromiseResolveBlock,
                   rejecter reject: RCTPromiseRejectBlock) -> Void {
    
    do {
      try deleteValueFromKeychain(account: account)
      resolve("Success")
    } catch KeychainError.unhandledError {
      reject("SecureStorage", "deleteValue: unhandledError", nil)
    } catch {
      reject("SecureStorage", "deleteValue: Generic error", nil);
    }
  }
}
