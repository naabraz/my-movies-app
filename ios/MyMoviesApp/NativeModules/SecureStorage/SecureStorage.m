#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SecureStorage, NSObject)

RCT_EXTERN_METHOD(getValue:(NSString *) account
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setValue:(NSString *) account
                  value: (NSString *) value
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(updateValue:(NSString *) account
                  value: (NSString *) value
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(deleteValue:(NSString *) account
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

@end
