
# iOS Module

This guide assumes you've already read and followed [Fuse JS Module](js-module.md). If not,
we strongly recommend beginning there first before proceeding.

A Fuse iOS  module is an iOS implementation of a plugin. They serve the
purpose of handling requests by the webview via the API server and doing an action
on behalf of the webview.

TODO - Show architecture diagram

Before we dive into creating an iOS project, we will discuss a few Fuse topics.

All Fuse classes will have a prefix of `BTFuse`, which for brevity will be omitted, unless if explicitly referencing a class using inline code syntax, (for example, `BTFuseContext`).

NOTE: Fuse framework is written in Objective-C and consuming the framework from Swift is not currently supported.

A `BTFuseContext` is a state holding object that holds a reference to all `BTFusePlugin` instances as well as the `BTFuseAPIServer` and `BTFuseAPIRouter`. When the webview makes a request to the API server, the message will be routed to the appropriate Fuse plugin via the API router.

## Creating the iOS project

Following along the [Getting Started](getting-started.md) guide, you should already have a `ios` directory. If not, then create one now.

Open XCode and create a new `Workspace` inside the `ios` directory. A Xcode workspace allows you to group several related projects, which will be used later. Name the workspace `EchoPlugin`.

NOTE: Per [Apple's naming convention](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CodingGuidelines/Articles/NamingBasics.html#//apple_ref/doc/uid/20001281-1002226), it's recommended to choose a minimum 3-letter prefix as a way to avoid naming collisions. This guide will however omit prefixing.

TODO - Show screenshot of creating workspace

After creating a workspace, XCode will have an empty workspace window. Now we need to create a new XCode `Project`, select `Framework` and name the project `EchoPlugin`. Save the project in the `ios` directory and assign it to the `EchoPlugin` workspace.

Now the workspace should have an `EchoPlugin` project and you're directory structure should look something like:

```
.
└── ios/
    ├── EchoPlugin.xcworkspace
    └── EchoPlugin/
        └── EchoPlugin.xcproj
```

While we are here, we can also create an Application project which can be used as our test application. Create a new `Project` called `testapp`, assign it to the `EchoPlugin` workspace and save it inside the `ios` directory.

NOTE: The default Application project will add support for iPadOS, WatchOS, TVOS, VisionOS, etc... however, the Fuse framework at this time only has support for iOS.

## Adding the Fuse dependency

The Fuse framework can be synced either via CocoaPods or by downloading the XCFramework directly from [GitHub](https://github.com/btfuse/fuse-ios/releases).

CocoaPods can make managing dependencies more easier since you can mark version of pods and CocoaPods can fetch
all the required dependencies to use that pod. If using CocoaPods, see the [Using CocoaPods](#using-cocoapods) section. If manually managing dependencies is preferred, then see [Managing Dependencies Manually](#managing-dependencies-manually) section.

### Using CocoaPods

If you don't already have cocoapods installed, see [CocoaPods](https://cocoapods.org/) website to get started. CocoaPods 1.15.0 or later is recommended.

Once CocoaPods is installed, create a `Podfile` inside the `ios` directory and paste in the following content:

``` ruby linenums="1" title="/Podfile"
workspace 'EchoPlugin'

platform :ios, '15.0'

source 'https://github.com/breautek/pods.git'

target 'EchoPlugin' do
    project 'EchoPlugin/EchoPlugin'
    use_frameworks!
    
    pod 'BTFuse', '0.8.7'
end
```

Save the file and run `pod install`, which will create a `Pods` project and adds it to your `EchoPlugin` workspace.

NOTE: It will be recommended to add `Pods` directory to your source version control ignore file.

NOTE: If you had XCode opened, it will likely detect project structure changes and you should reload the project from disk, if prompted.

CocoaPods usually does a lot of project level management for you, however for framework targets, CocoaPods will just make the pod available, but CocoaPods will not link or embed the pod to your framework target. Therefore, we need to link against `BTFuse.xcframework`, without embedding it.

Click on the `EchoPlugin` project to open the Project view panel.

TODO - show screenshot

Ensure that the `EchoPlugin` target is selected on the left side, and then view the `General` tab. Under `Frameworks and Libraries`, change `BTFuse.xcframework`'s `Embed` option `Do not embed`. This allows your framework to compile against the Fuse framework without including the framework when you publishing your own plugin.

TODO - show screenshot

### Managing Dependencies Manually

If you have already setup and used CocoaPods, then you can proceed to the [next section](#implementing-the-echoplugin).

If you prefer not to use CocoaPods, then managing the dependencies manually is another option and may be suitable for smaller projects. Create a `frameworks` folder inside the `ios` directory and download the latest version of `BTFuse.xcframework.zip` file from [Fuse GitHub Releases](https://github.com/btfuse/fuse-ios/releases).

Extract the contents into `ios/frameworks`. There should now be a `ios/frameworks/BTFuse.xcframework`.

Inside XCode's Project Navigator, right-click the `EchoPlugin` project and create a `New Group`, name it `frameworks`.

TODO - Show screenshot

Now, open the path to `ios/frameworks` in `Finder` and drag & drop the `BTFuse.xcframework` inside `EchoPlugin` `frameworks` group.

TODO - Show screenshot

When dropping the XCFramework, a dialog will be opened to asking the target memberships. Select `EchoPlugin`.

TODO - show Screenshot

By default, XCode will link against the XCFramework by embedding & signing it. However Fuse framework should **not** be embedded in Fuse plugin frameworks, as doing so will cause conflicts when users try to consume your plugin. To address this, click on the `EchoPlugin` project to open the Project view panel.

TODO - show screenshot

Ensure that the `EchoPlugin` target is selected on the left side, and then view the `General` tab. Under `Frameworks and Libraries`, change `BTFuse.xcframework`'s `Embed` option `Do not embed`. This allows your framework to compile against the Fuse framework without including the framework when you publishing your own plugin.

TODO - show screenshot

You may repeat these steps for the `testapp`, however it is fine for the test app to `Embed & Sign` the `BTFuse.xcframework`, as the application is the final product.

## Implementing the EchoPlugin

Now we are ready to start writing some code!

Create a new `Header` file inside the `EchoPlugin` project and name it `EchoPlugin.h`. Paste in the following contents:

``` obj-c title="EchoPlugin.h" linenums="1"
#ifndef EchoPlugin_h
#define EchoPlugin_h

#import <Foundation/Foundation.h>
#import <BTFuse/BTFuse.h>

@interface EchoPlugin : BTFusePlugin

@end

#endif
```

Now create a new `Objective-C` source file inside teh `EchoPlugin`, name it `EchoPlugin.m`. Paste in the following contents:

``` obj-c title="EchoPlugin.m" linenums="1"

#import "EchoPlugin.h"
#import <BTFuse/BTFuse.h>

@implementation EchoPlugin

- (NSString*) getID {
    return @"echo";
}

- (void) initHandles {
    [self attachHandler:@"/echo" callback:^void(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        NSData* message = [packet readAsBinary];

        [response setStatus: BTFuseAPIResponseStatusOk];
        [response setContentType:@"text/plain"];
        [response setContentLength: [data length]];
        
        [response didFinishHeaders];
        [response pushData:data];
        
        [response didFinish];
    }];
}

@end
```

Let's breakdown what we've just done.

#### constructor

In this example, the constructor is not shown, however if you need a constructor, then override the `init:(BTFuseContext*)` selector.

#### getID

This is an `abstract` method and it should return a constant string and it should match the chosen id as the JS module's `BTFusePlugin` implementation. This identifier is used to map to your plugin. It must be unique and is the glue that ties your native plugin to the JS module.

For more information see the Getting Started [Plugin Identifiers](./getting-started.md#plugin-identifiers) section.

#### _initHandles

This is also an `abstract` method, it gets invoked during plugin construction. This is where a plugin should attach all handlers. Handlers are a type of code block in which returns `void` and accepts a `BTFuseAPIPacket*` and `BTFUseAPIResponse*` objects.

A plugin may have several handlers attached, as long as the endpoint string is unique. The endpoint string always starts with a forward slash `/` character and it corresponds to the JS module's `this._exec` method usage.

NOTE: While the API gateway is a HTTP server, URL hash fragments and query strings are not supported at this time.

When an handler block is invoked, it will be given a packet and a response object used to read data and write data back out. The API server operates in a binary fashion, but provides utilities to read the data as JSON, string, or other formats. Additionally, the raw input stream can be obtained if fine control is required, particularly if working with large datasets.

WARNING: When using the input stream directly, do not attempt to read more bytes than what `getContentLength` returns. Doing so will cause a thread block awaiting for more data to be received, which will never occur.

Handler blocks is always invoked on a background thread. The `BTFuseAPIPacket*` is not thread-safe and should **only** be used in the handler block. The `BTFuseAPIResponse*` object is however thread-safe and any calls made on it will be diverted to it's network thread asynchronously.

## BTFuseAPIPacket

In the sample code, we use `readAsBinary` to receive a `NSData*` object and passes the data back to the response object as an "echo".

|Method|Return Type|Description|
|---|---|---|
|`readAsString`|`NSString*`|Reads the content body as a string|
|`readAsBinary`|`NSData*`|Reads the content body as a byte buffer|
|`readAsJSONObject`|`NSDictionary*`|Reads the content body as a JSON object|
|`readAsJSONArray`|`NSArray*`|Reads the content body as a JSON array|

An `NSInputStream*` is also available on the client object:

``` obj-c
NSInputStream* input = [[packet getClient] getInputStream];
```

WARNING: It's unsafe to use the underlying `InputStream` if any of the read APIs is also used, as they will consume the bytes of the input stream.

Additionally, the packet object also has `getContentLength` and `getContentType` APIs to know the "kind" of data and the size, as given by the JS module.

## BTFuseAPIResponse

The `BTFuseAPIResponse` object is used to provide a response back to the HTTP request.
Unlike the standard browser, there is no network timeout, but there is a concurrency limit on HTTP connections. Therefore the plugin should respond back as quickly as possible.

Unlike `BTFuseAPIPacket`, the `BTFuseAPIResponse` is thread-safe. If you call on any of the APIs, it will ensure to use it's own dedicated networking thread. However, using the `BTFuseAPIResponse` should still be done on a single thread, to ensure data is written in the proper order.

Most of the time, `BTFuseAPIResponse` will be used to send a small data packet response back to the webview and the API has several convenience methods to do this quickly. However we will take a moment to go through the low-level API so that we can understand what is going on behind the scenes.

The API protocol uses HTTP, so the first thing required is setting and sending the headers. This must be done before any data is sent. To acheive this, set the status, content type, and content length, and then call `didFinishHeaders`.

``` obj-c
[response setStatus: BTFuseAPIResponseStatusOk];
[response setContentType:@"text/plain"];
[response setContentLength: 6]; // "Hello!"
[response didFinishHeaders];
```

Alternatively, we can also do this via `finishHeaders:withContentType:withContentLength`:

``` obj-c
[response finishHeaders: BTFuseAPIResponseStatusOk withContentType: @"text/plain" withContentLength: 6];
```

Once `didFinishHeaders` is called, headers cannot be changed, but data can now be pushed via `pushData`, which accepts a `NSData*` buffer.

``` obj-c
NSData* buffer = [@"Hello!" dataUsingEncoding: NSUTF8StringEncoding];
[response pushData: buffer];
```

`pushData` can be invoked as many times as needed, which is useful for chunking data such as reading from a data stream. Once you're finished writing data, use `didFinish` to signal that you're done.

``` obj-c
[response didFinish];
```

Once `didFinish` is called, the request is completed and using and the connection will be flushed and closed. Do not use the response object after `didFinish` has been invoked.

NOTE: Pushing data will write to the underlying network socket but data is not delivered to the client until the socket is closed. This is a limitation of browser clients and webviews. The [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts) should solve this issue, but this API is still rather fresh.

A full example may look like this:

``` obj-c
[response setStatus: BTFuseAPIResponseStatusOk];
[response setContentType:@"text/plain"];
[response setContentLength: 6]; // "Hello!"
[response didFinishHeaders];

NSData* buffer = [@"Hello!" dataUsingEncoding: NSUTF8StringEncoding];
[response pushData: buffer];

[response didFinish];
```

WARNING: Writing more bytes than what is specified via `setContentLength` is undefined behaviour. Take care to write exactly the bytes specified. Do not write more or less than the specified bytes.

This is quite cumbersome and error prone if you forget a line or miscalculate the bytes required. While the low-level API is a good thing to be aware of, there are several convenience APIs that allows you to write strings and other data types. These handle sending the HTTP headers as well as the data writing.

|Method|Purpose|
|---|---|
|`sendData:(NSData*):withType:(NSString*)`|Sends binary data as the specified content type.|
|`sendData:(NSData*)`|Sends binary data as `application/octet-stream`.|
|`send(IFuseSerializable data, String contentType)`|Sends a serializable as the specified content type.|
|`sendJSON:(NSDictionary*)`|Sends a JSON object as `application/json`.|
|`sendString:(NSString*)`|Sends text data as `text/plain`.|
|`sendError:(BTFuseError*)`|Sends a serialized fuse error object as `application/json`.|
|`sendNoContent`|Sends a successful state with no data.|
|`didInternalError()`|Sends a 500 status code. Use `sendError` to send a more useful error signal.|
|`kill:(NSString*)`|Abruptly and non-gracefully closes the connection.|

We can rewrite our above example with:

``` obj-c
[response sendString: @"Hello!"];
```

And this is a safe way of setting the status, content type, and content length, sending the headers, writing the `"Hello!"` data as binary byte content, and finally closing the connection.

## Using continuous callbacks

The HTTP protocol allows for a very efficient data transfer of content including binary content but it does have some limitations. Any HTTP request must be responded to in a timely manner. The webview only allows a small limit of concurrent connections opened at a given time. Exceeding this limit will cause an HTTP connection be blocked until an active connection has been closed.

Therefore the HTTP protocol doesn't suite very well if the native API needs to do a long running task, or needs to continous call on the webview (e.g. to provide sensor updates).

For these use cases, it's best to setup a callback API. A callback API requires 3 things:

- A HTTP API to register a callback id.
- A HTTP API to unregister a callback id, for when the callback is no longer needed.
- Using a `BTFuseContext*` to dispatch messages back to the callback using the callback id.

The drawback of callback style APIs is that it uses the more traditional webview bridge, which only supports string data. Binary data should be base64 encoded, which is slow and will increase the memory consumption by about 33%.

But for a watch-style callback, these limitations are probably fine as the data packets can be sent as frequent but small data packets.

Let's add a new instance member, `NSString* callbackID` on our `EchoPlugin`.

``` obj-c title="EchoPlugin.m"
@implementation EchoPlugin {
    NSString* callbackID;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [super init:context];

    callbackID = nil;

    return self;
}

...
```

Now let's add couple new handlers to our `EchoPlugin`.

``` obj-c title="EchoPlugin.m"
- (void) initHandles {
    ...

    __weak EchoPlugin* weakSelf = self;

    [self attachHandler:@"/registerCallback" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        EchoPlugin* strongSelf = weakSelf;
        // For brevity, nil checking is omitted.

        strongSelf->callbackID = [packet readAsString];

        [response sendNoContent];
    }];

    [self attachHandler:@"/unregisterCallback" callback:^(BTFuseAPIPacket* packet, BTFuseAPIResponse* response) {
        EchoPlugin* strongSelf = weakSelf;
        // For brevity, nil checking is omitted.

        strongSelf->callbackID = nil;

        [response sendNoContent];
    }];
}
```

Now we have a `/registerCallback` handler that reads a string and assigns `callbackID` to it, and a `/unregisterCallback` that sets the `callbackID` as nil.

Let's add the last piece now, a periodic timer that uses the callback id if present.

``` obj-c title="EchoPlugin.m"
- (instancetype) init:(BTFuseContext*) context {
    self = [super init:context];

    callbackID = nil;

    NSTimer* timer = [
        NSTimer scheduledTimerWithTimeInterval:5.0
        repeats:YES
        block: ^(NSTimer* timer) {
            if (self->callbackID != nil) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    // Get the current date and time
                    NSDate* currentDate = [NSDate date];
                    NSTimeInterval timestampInSeconds = [currentDate timeIntervalSince1970];
                    double timestampInMilliseconds = timestampInSeconds * 1000.0;
                    long long milliseconds = (long long)timestampInMilliseconds;
                    NSString* timestampString = [[NSString alloc] initWithFormat:@"%lld, milliseconds];

                    [[self getContext] execCallback: self->callbackID withData: timestampString];
                    
                });
                [self getContext]
            }
        }
    ];

    [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
    [[NSRunLoop currentRunLoop] run];

    return self;
}
```

Now when `/registerCallback` is called with a callback ID, the callback will be invoked every second with the current system clock time in milliseconds.

NOTE: `execCallback` must be called on the main thread.

## Unit Testing

TBD

## Creating a Test App

TBD
