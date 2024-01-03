import axios from 'axios';

export default class AxiosConfig {
    constructor(url, key) {
        const options = {
            baseURL: url,
            headers: {
                ContentType: 'application/json'
            }
        }
        this.instance = axios.create(options);

        this.instance.interceptors.request.use((config) => {

            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json';
            config.headers['API-Key'] = key;
            config.headers['Accept-Language'] = 'en';
            config.headers['Access-Control-Allow-Origin'] = '*';

            return config;
        }, function (err) {
            return Promise.reject(err);
        });

        return this.instance;

    }

}




