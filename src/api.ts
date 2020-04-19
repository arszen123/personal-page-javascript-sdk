import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export class Api {
    protected api: AxiosInstance;

    public constructor(config?: AxiosRequestConfig) {
        this.api = axios.create(config);
        this.api.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json';
            return config;
        });
    }

    public getUri(config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }

    public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.api.request(config);
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.delete(url, config);
    }

    public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.head(url, config);
    }

    public post<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.api.post(url, data || {}, config);
    }

    public put<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.api.put(url, data || {}, config);
    }

    public patch<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.api.patch(url, data || {}, config);
    }
}

export class UserApi extends Api {
    constructor(token: string, client_id: string, config?: AxiosRequestConfig) {
        super(config);
        this.api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            config.params = config.params || {};
            config.params.client_id = client_id;
            return config;
        });
    }
}
