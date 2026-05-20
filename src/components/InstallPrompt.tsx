import {useEffect, useState} from "react";
import {H4} from "@/ui/Headings";


export function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
        )

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (!isIOS) {
        return null
    }

    if (isStandalone) {
        return null
    }

    return (
        <div>
            <H4>Install app: <span>Add to Home Screen</span></H4>
            {isIOS && (
                <p>
                    {"To install this app on your iOS device, tap the share button"}
                    <span role="img" aria-label="share icon">
            {' '}
                        ⎋{' '}
          </span>
                    {"and then \"Add to Home Screen\""}
                    <span role="img" aria-label="plus icon">
            {' '}
                        ➕{' '}
          </span>.
                </p>
            )}
        </div>
    )
}

export default function Page() {
    return (
        <div>
            <InstallPrompt />
        </div>
    )
}