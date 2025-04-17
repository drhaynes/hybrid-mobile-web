//
//  JSONValue.swift
//  MobileApp
//
//  Created by drh on 15/04/2025.
//

import Foundation

enum JSONValue {
    case boolean(Bool)
    case number(Double)
    case string(String)
    case array([JSONValue?])
    case object([String: JSONValue])
}

extension JSONValue: Codable {
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        
        if let boolValue = try? container.decode(Bool.self) {
            self = .boolean(boolValue)
        } else if let numberValue = try? container.decode(Double.self) {
            self = .number(numberValue)
        } else if let stringValue = try? container.decode(String.self) {
            self = .string(stringValue)
        } else if let arrayValue = try? container.decode([JSONValue?].self) {
            self = .array(arrayValue)
        } else {
            let objectValue = try container.decode([String: JSONValue].self)
            self = .object(objectValue)
        }
    }
}
