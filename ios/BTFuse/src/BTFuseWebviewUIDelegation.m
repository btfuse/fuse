
/*
Copyright 2023 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#import <Foundation/Foundation.h>
#import <BTFuseWebviewUIDelegation.h>
#import <BTFuse/BTFuseLocalization.h>

@implementation BTFuseWebviewUIDelegation

- (void)    webView:(WKWebView*) webView
            runJavaScriptAlertPanelWithMessage:(NSString*) message
            initiatedByFrame:(WKFrameInfo*) frame
            completionHandler:(void (^)(void)) completionHandler
{
    
    UIAlertController* alertController = [ UIAlertController
        alertControllerWithTitle: nil
        message: message
        preferredStyle: UIAlertControllerStyleAlert
    ];
    
    [
        alertController
        addAction: [
            UIAlertAction
            actionWithTitle: [BTFuseLocalization lookup:@"FUSE_DIALOG_OK_BUTTON_LABEL"]
            style: UIAlertActionStyleDefault
            handler: ^(UIAlertAction * _Nonnull action) {
                completionHandler();
            }
        ]
    ];
    
    [self presentViewController: alertController animated: true completion: nil];
}

- (void)    webView:(WKWebView*) webView
            runJavaScriptConfirmPanelWithMessage:(NSString*) message
            initiatedByFrame:(WKFrameInfo*) frame
            completionHandler:(void (^)(BOOL)) completionHandler
{
    UIAlertController* alertController = [
        UIAlertController
        alertControllerWithTitle: nil
        message: message
        preferredStyle: UIAlertControllerStyleAlert
    ];
    
    [
        alertController
        addAction: [
            UIAlertAction
            actionWithTitle: [BTFuseLocalization lookup:@"FUSE_DIALOG_CANCEL_BUTTON_LABEL"]
            style: UIAlertActionStyleDefault
            handler: ^(UIAlertAction* _Nonnull action) {
                completionHandler(false);
            }
        ]
    ];
    
    [
        alertController
        addAction: [
            UIAlertAction
            actionWithTitle: [BTFuseLocalization lookup:@"FUSE_DIALOG_OK_BUTTON_LABEL"]
            style: UIAlertActionStyleDefault
            handler: ^(UIAlertAction* _Nonnull action) {
                completionHandler(true);
            }
        ]
    ];
    
    [self presentViewController:alertController animated:YES completion:nil];
}

- (void)    webView:(WKWebView*) webView
            runJavaScriptTextInputPanelWithPrompt:(NSString*) prompt
            defaultText:(NSString*) defaultText
            initiatedByFrame:(WKFrameInfo*) frame
            completionHandler:(void (^)(NSString* _Nullable)) completionHandler
{
    UIAlertController* alertController = [
        UIAlertController alertControllerWithTitle: nil
        message: prompt
        preferredStyle: UIAlertControllerStyleAlert
    ];
    
    [
        alertController
        addTextFieldWithConfigurationHandler:^(UITextField* _Nonnull textField) {
            textField.text = defaultText;
        }
    ];
    
    [
        alertController
        addAction: [
            UIAlertAction
            actionWithTitle: [BTFuseLocalization lookup:@"FUSE_DIALOG_CANCEL_BUTTON_LABEL"]
            style: UIAlertActionStyleDefault
            handler: ^(UIAlertAction * _Nonnull action) {
                completionHandler(nil);
            }
        ]
    ];
    
    [
        alertController
            addAction: [
                UIAlertAction
                actionWithTitle: [BTFuseLocalization lookup:@"FUSE_DIALOG_OK_BUTTON_LABEL"]
                style: UIAlertActionStyleDefault
                handler: ^(UIAlertAction * _Nonnull action) {
                    completionHandler(alertController.textFields.firstObject.text);
                }
            ]
    ];
    
    [self presentViewController: alertController animated: true completion: nil];
}

- (void) webViewDidClose:(WKWebView*) webView {
    NSLog(@"Webview closed!");
}

@end
