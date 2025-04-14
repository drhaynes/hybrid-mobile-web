//
//  WebkitWrapperView.swift
//  MobileApp
//
//  Created by drh on 14/04/2025.
//

import SwiftUI
import WebKit

struct WebkitWrapperView: UIViewRepresentable {
    let linkNavigationHandler: ((URL) -> Void)?
    
    func makeUIView(context: Context) -> WKWebView {
        let webConfiguration = WKWebViewConfiguration()
        let scriptHandler = WebkitScriptHandler()
        webConfiguration
            .userContentController
            .addScriptMessageHandler(scriptHandler,
                                     contentWorld: .page,
                                     name: "mobile-script-handler")
        webConfiguration.applicationNameForUserAgent = "app/mobile"
        let webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.load(URLRequest(url: URL(string: "http://localhost:3000")!))
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) { }
}


class WebkitScriptHandler: NSObject {}

// MARK: - WKScriptMessageHandlerWithReply

extension WebkitScriptHandler: WKScriptMessageHandlerWithReply {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage, replyHandler: @escaping (Any?, String?) -> Void) {
        guard let bodyString = message.body as? String else {
            return
        }
        print("Got message: " + bodyString)
    }
}
