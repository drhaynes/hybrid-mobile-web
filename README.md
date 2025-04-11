# Hybrid mobile/web App Architecture Example

This project is an example of how to build a hybrid mobile app that uses a combination of platform-native code and embedded web views that can display and interact with views from a nextjs + react web app.

This hybrid architecture is useful for rapid development of mobile apps that can use as much (or as little) of an existing web frontend as required.

For more details of the capabilities and mechanisms see [technical information]().

## Project Structure

The project consists of two parts:

1. A web frontend app
2. A native iOS app

## Running the Example Locally

1. Build and serve the web + frontend
2. Build and run the app in Xcode

## Technical Information

***[TODO]***

* How messages are passed back and forth (useful for passing JWTs or other information back and forth between the native and web environments).

* How the react header compoent is hidden (useful for preventing unwanted navigation to other parts of the main web app).

* Navigation link overriding in the web view delegate (for displaying native views of pages that also exist on the web).

## License

This project is distributed under the terms of both the MIT license and the
Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE-APACHE) and [LICENSE-MIT](LICENSE-MIT), and for
details.
