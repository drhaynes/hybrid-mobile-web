//
//  WebScriptHandler.swift
//  MobileApp
//
//  Created by drh on 15/04/2025.
//

import Foundation
import WebKit

class WebScriptMessageHandler: NSObject {}

// MARK: - WKScriptMessageHandlerWithReply

extension WebScriptMessageHandler: WKScriptMessageHandlerWithReply {
    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage,
                               replyHandler: @escaping (Any?, String?) -> Void) {
        guard let bodyString = message.body as? String,
              let bodyData = bodyString.data(using: .utf8) else {
            print("Error decoding message body")
            return
        }
        print("Got message: " + bodyString)
        do {
            let message = try JSONDecoder().decode(WebScriptMessage.self, from: bodyData)
            switch message.method {
            case "log":
                handleLogMessage(message)
            case "infoRequest":
                handleInfoRequest(message, replyHandler: replyHandler)
            default:
                print("Warning: Unsupported script method received: \(message.method)")
            }
        } catch {
            print("Error decoding script message: \(error)")
        }
    }
    
    private func handleLogMessage(_ message: WebScriptMessage) {
        let value = message.params?["text"]
        switch value {
            case let .string(logMessage):
                print("Received log message: \(logMessage)")
            default:
            print("No text present in log message")
        }
    }
    
    private func handleInfoRequest(_ message: WebScriptMessage,
                                   replyHandler: @escaping (Any?, String?) -> Void) {
        let value = message.params?["text"]
        switch value {
            case let .string(text):
                print("Received info request text: \(text)")
                sendInfoResponse(message: "Hello from Swift, you sent: \(text)", replyHandler: replyHandler)
            default:
            print("No text present in info request message")
        }
    }
    
    private func sendInfoResponse(message: String, replyHandler: @escaping (Any?, String?) -> Void) {
        let response = WebScriptResponse(method: "infoResponse", result: ["message": message])
        let responseString = String(data: try! JSONEncoder().encode(response), encoding: .utf8)
        replyHandler(responseString, nil)
    }
}
