'use client'

import { useEffect } from 'react'
import {nativeMobileAppUserAgent} from "@/hooks/useAppInNativeMobileContext";

declare global {
    let messageHandler: MessagePort | undefined
    interface Window {
        webkit:
            | { messageHandlers: { messageHandler: { postMessage: (message: string) => Promise<string> } } }
            | undefined
    }
}

export const canSendPostMessage = () =>
    nativeMobileAppUserAgent() && (typeof messageHandler !== 'undefined' || typeof window.webkit?.messageHandlers.messageHandler !== 'undefined')

export const useMessageEventListener = <Result,>(method: string, callback: (result: Result) => void) => {
    useEffect(() => {
        const listener = (event: MessageEvent) => {
            try {
                const data: { method: string; result: Result } = JSON.parse(event.data)
                if (data.method === method) {
                    callback(data.result)
                }
            } catch (error) {
                console.error('Invalid JSON in message', event, error)
            }
        }
        if (typeof messageHandler !== 'undefined') {
            messageHandler.addEventListener('message', listener, false)
            return () => messageHandler?.removeEventListener('message', listener)
        }
    }, [callback, method])
}

export const sendPostMessage = async <Result, CallbackResult>(
    method: string,
    params?: object,
    callback?: (result: Result) => CallbackResult
) => {
    const message = JSON.stringify({ method, params: params || null })
    if (typeof messageHandler !== 'undefined') {
        // Non-Apple
        messageHandler?.postMessage(message)
    } else if (typeof window.webkit !== 'undefined') {
        // Apple
        const response = await window.webkit.messageHandlers?.messageHandler?.postMessage(message)
        return callback?.(JSON.parse(response).result)
    }
}