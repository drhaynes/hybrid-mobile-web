# Hybrid mobile/web App Architecture Example

This project is an example of how to build a hybrid mobile app that uses a combination of platform-native code and embedded web views that can display and interact with pages from a Next.js + React web app.

This hybrid architecture is useful for rapid development of mobile apps that can use as much (or as little) of an existing web frontend as required.

For more details of the capabilities and mechanisms see [technical information](#technical-information).

## Project Structure

The project consists of two parts:

1. A Next.js web app ([./web](./web))
2. A native iOS app ([./mobile-ios](./mobile-ios))

## Running the Example Locally

### Pre-requisites

* Node + pnpm
* Xcode 16

### 1. Build and serve the web + frontend

```
$ cd web
$ pnpm run dev 
```

Web app will be avilable at: [localhost:3000](http://localhost:3000)

### 2. Build and run the app in Xcode


## Technical Information

### Native Mobile App Context Detection

The web app uses the presence of pre-defined user agent string `nativeMobileAppUserAgent` to detect if it is running in a native mobile web view context or not.

The custom react hook [`useAppInNativeMobileContext`](./web/src/hooks/useAppInNativeMobileContext.ts) can then be used from any component to render or behave conditionally depending on whether the web app is running in a web or native mobile web view.

Note: Any React component using this hook will need to declare `'use client'` at the top of the file to indicate that this logic can only run client-side.

### Next.js Link router bypass

When the Next.js router is in use, iOS web view navigation delegate methods are never invoked in native code.

To bypass this, the Next.js `Link` component is wrapped, see: [`WrappedLink`](./web/src/components/WrappedLink/WrappedLink.tsx).

The wrapped link uses standard links when in a native context, and the usual Next.js `Link` components when in a normal web context.

This component should be used for all links in the web app.

With link navigation interception working on the native side, navigation can then be routed to a native view if one exists for a given link.

### Hiding of components (such as header & footer)

* TODO: How react compoents can be hidden (useful for preventing unwanted navigation to other parts of the main web app).

### Message passing

* TODO: How messages are passed back and forth (useful for passing JWTs or other information back and forth between the native and web environments).


## License

This project is distributed under the terms of both the MIT license and the
Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE-APACHE) and [LICENSE-MIT](LICENSE-MIT), and for
details.
