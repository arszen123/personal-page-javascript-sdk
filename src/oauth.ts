import {config} from '@config/config'
import {QueryParams} from "@src/query-params";
import {InitData} from "@src/interfaces/InitData";
import {SignInWindowOpener} from "@src/sign-in-window-opener";
import {User} from "@src/user";

export class Oauth {
    private signInWindow?: SignInWindowOpener;
    private _user: User|null = null;

    private static STATUS_UNAUTHORIZED = 'STATUS_UNAUTHORIZED';
    private static STATUS_AUTHORIZED = 'STATUS_AUTHORIZED';
    private static STATUS_ALREADY_AUTHORIZED = 'STATUS_ALREADY_AUTHORIZED';

    public constructor(private readonly data: InitData) {
    }

    public loginWithToken(token: string) {
        this._user = new User(token, this.data.clientId);
    }

    public login(calle: (value: any) => void) {
        if (this._user) {
            calle({
                success: true,
                token: this._user.getToken(),
                status: Oauth.STATUS_ALREADY_AUTHORIZED
            });
            return;
        }
        if (!this.signInWindow) {
            const queryParams = new QueryParams();
            queryParams.setParam('redirect_uri', <string>this.data.redirectUri)
                .setParam('client_id', this.data.clientId)
                .setParam('scope', this.data.scopes.join(';'));
            const url = config.authUrl + '?' + queryParams.toString();
            this.signInWindow = new SignInWindowOpener(url, 'Authorization', this.messageEventListener(calle));
        }
        this.signInWindow.open();
    }

    public logout(calle: (value: any) => void) {
        this._assertUser();
        (<User>this._user).logout(value => {
            this._user = null;
            calle(value);
        });
    }

    public get user(): User {
        this._assertUser();
        return <User>this._user;
    }

    private _assertUser() {
        if (this._user === null) {
            throw new Error('No user is logged in!');
        }
    }

    private messageEventListener(calle: (value: any) => void): (event: any) => void {
        return (event: MessageEvent) => {
            if (event.data.success) {
                const token = event.data.token;
                this._user = new User(token, this.data.clientId);
                calle({
                    success: true,
                    token: token,
                    status: Oauth.STATUS_AUTHORIZED
                });
                return;
            }
            calle({
                success: false,
                token: null,
                status: Oauth.STATUS_UNAUTHORIZED
            });
        }
    }
}
