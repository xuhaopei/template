declare module '*.module.less' {
    const classes: { [key: string]: string }
    export default classes
} declare module '*.module.scss' {
    const classes: { [key: string]: string }
    export default classes
}
declare module '*.jpg'
declare module '*.png'

// 抄这个文档写的：https://stackoverflow.com/questions/51503754/typescript-type-beforeinstallpromptevent
interface BeforeInstallPromptEvent extends Event {

    /**
     * Returns an array of DOMString items containing the platforms on which the event was dispatched.
     * This is provided for user agents that want to present a choice of versions to the user such as,
     * for example, "web" or "play" which would allow the user to chose between a web version or
     * an Android version.
     */
    readonly platforms: Array<string>;

    /**
     * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
     */
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>;

    /**
     * Allows a developer to show the install prompt at a time of their own choosing.
     * This method returns a Promise.
     */
    prompt(): Promise<void>;

}

declare interface Window {
    deferredPrompt: BeforeInstallPromptEvent
}