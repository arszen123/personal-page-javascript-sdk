export class QueryParams {
    private params: {
        [key: string]: string | number
    };

    public constructor(params: {
        [key: string]: string | number
    } = {}) {
        this.params = params;
    }

    public setParam(key: string, value: string | number) {
        this.params[key] = value;
        return this;
    }

    public removeParam(key: string) {
        delete this.params[key];
        return this;
    }

    public toString() {
        const esc = encodeURIComponent;
        return Object.keys(this.params)
            .map(key => esc(key) + '=' + esc(this.params[key]))
            .join('&');
    }
}
