//
//  WebKitWrapperView.swift
//  MobileApp
//
//  Created by drh on 14/04/2025.
//

import SwiftUI
import WebKit

struct WebKitWrapperView: UIViewRepresentable {
    let linkNavigationHandler: ((URL) -> Void)?
    let scriptMessageHandler: WebScriptMessageHandler
    let messageHandlerName = "messageHandler"
    let nativeMobileUserAgent = "app/mobile"
    let homePageURL = URL(string: "http://localhost:3000")!
    
    func makeUIView(context: Context) -> WKWebView {
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration
            .userContentController
            .addScriptMessageHandler(scriptMessageHandler,
                                     contentWorld: .page,
                                     name: messageHandlerName)
        webConfiguration.applicationNameForUserAgent = nativeMobileUserAgent
        let webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.load(URLRequest(url: homePageURL))
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) { }
}
