export class SignInWindowOpener {
    private windowObjectReference: any = null;
    private previousUrl?: string;

    public constructor(
        private readonly url: string,
        private readonly name: string,
        private readonly ev: (event: MessageEvent) => void
    ) {
    }

    public open() {
        const that = this;
        const eventListener = function (event: MessageEvent) {
            that.windowObjectReference.close();
            that.ev(event);
            window.removeEventListener('message', eventListener);
        };
        window.removeEventListener('message', eventListener);

        const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (this.windowObjectReference === null || this.windowObjectReference.closed) {
            this.windowObjectReference = window.open(this.url, name, strWindowFeatures);
        } else if (this.previousUrl !== this.url) {
            this.windowObjectReference = window.open(this.url, name, strWindowFeatures);
            this.windowObjectReference.focus();
        } else {
            this.windowObjectReference.focus();
        }

        window.addEventListener('message', eventListener, false);
        this.previousUrl = this.url;
    }
}
