//
//  ContentView.swift
//  MobileApp
//
//  Created by drh on 11/04/2025.
//

import SwiftUI

struct ContentView: View {
    let linkHandler: (URL) -> Void = { url in
        print(url.path)
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                Image(systemName: "globe")
                    .imageScale(.large)
                    .foregroundStyle(.tint)
                NavigationLink("Open Web View", value: "WebView")
            }
            .padding()
            .navigationDestination(for: String.self) { value in
                if value == "WebView" {
                    let webView = WebkitWrapperView(linkNavigationHandler: linkHandler)
                    webView
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
