'use client'

import Image from 'next/image';
import '@/styles/globals.css';
import { useState } from 'react';
import { canSendPostMessage, sendPostMessage, useMessageEventListener } from "@/hooks/useMessageHandler";

export default function AboutPage() {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleMessageButtonClick = async () => {
        if (canSendPostMessage()) {
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            await sendPostMessage('log', {'text': 'Hello, world!'}, undefined)
        }
    }

    const updateMessage = (result: { message?: string }) => {
        setMessage(result.message || 'error');
    }

    const handleRequestButtonClick = async () => {
        if (canSendPostMessage()) {
            await sendPostMessage('infoRequest', {'text': 'Some data'}, updateMessage)
        }
    }

    useMessageEventListener('infoRequest', updateMessage);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    This is the web app about page.
                    <button
                        onClick={handleMessageButtonClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Send Message
                    </button>
                    <button
                        onClick={handleRequestButtonClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Request Native Response
                    </button>
                </div>
                { showMessage && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md border border-green-200 shadow-sm">
                        Message sent!
                    </div>
                )}
                { message && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md border border-green-200 shadow-sm">
                        Message: {message}
                    </div>
                )}
            </main>
        </div>
    );
}