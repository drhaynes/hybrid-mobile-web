//
//  WebScriptMessage.swift
//  MobileApp
//
//  Created by drh on 15/04/2025.
//

import Foundation

struct WebScriptMessage: Decodable {
    let method: String
    let params: [String: JSONValue]?
}

struct WebScriptResponse: Encodable {
    let method: String
    let result: [String: String]?
}
