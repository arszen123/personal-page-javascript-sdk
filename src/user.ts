import {Api, UserApi} from "@src/api";
import {config} from "@config/config";


export class User {
    private readonly api: Api;
    private _data: any = {};

    constructor(private readonly token: string, private readonly clientId: string) {
        this.api = new UserApi(token, clientId, {
            baseURL: config.apiUrl
        });
    }

    public get data() {
        return this.wrap('details', 'user/details');
    }

    public get experience() {
        return this.wrap('experiences', 'user/work-experiences');
    }

    public get education() {
        return this.wrap('educations', 'user/educations');
    }

    public get contact() {
        return this.wrap('contacts', 'user/contacts');
    }

    public get skill() {
        return this.wrap('skills', 'user/skills');
    }

    public get language() {
        return this.wrap('languages', 'user/languages');
    }

    public logout(calle: (value: any) => void) {
        this.api.post('oauth/logout').then((value: any) => {
            calle(value.data);
        });
    }

    public getToken(): string {
        return this.token;
    }

    /**
     * If the request has already been fulfilled, resolve the stored values.
     * @param type
     * @param url
     */
    private wrap<T>(type: string, url: string) {
        return new Promise((resolve, reject) => {
            if (this._data[type]) {
                resolve(this._data[type]);
                return;
            }
            this.api.get(url).then(value => {
                this._data[type] = value.data;
                resolve(this._data[type]);
            }, reason => {
                reject(reason);
            });
        });
    }
}
