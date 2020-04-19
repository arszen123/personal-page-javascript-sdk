import {InitData} from "@src/interfaces/InitData";
import {Oauth} from "@src/oauth";

export {
    init,
    auth
}

function init(data: InitData) {
    PP.init(data);
}

function auth() {
    return PP.getInstance().auth;
}

class PP {
    private static instance?: PP;
    private _oauth?: Oauth;

    private constructor(private data: InitData) {
        this.data.redirectUri = this.data.redirectUri || window.origin;
    }

    public static init(data: InitData) {
        PP.instance = new PP(data);
        Object.freeze(PP.instance.data);
    }

    public static getInstance() {
        if (!PP.instance) {
            throw new Error('PP instance is not initialized!');
        }
        return PP.instance;
    }

    public get auth(): Oauth {
        if (typeof this._oauth === 'undefined') {
            this._oauth = new Oauth(this.data);
        }
        return this._oauth;
    }
}
