import { useEffect, useState } from "react";

export const nativeMobileAppUserAgentString = 'app/mobile'

export const nativeMobileAppUserAgent = () =>
    typeof window !== 'undefined' && window.navigator?.userAgent?.includes(nativeMobileAppUserAgentString)

export const useAppInNativeMobileContext = () => {
    const [isAppInNativeMobileContext, setIsAppInNativeMobileContext] = useState(false)
    useEffect(() => {
        setIsAppInNativeMobileContext(nativeMobileAppUserAgent())
    }, [])
    return isAppInNativeMobileContext
}
