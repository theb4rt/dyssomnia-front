import config from '../config';

class Service {
    baseUrl: string;
    token: string | undefined | null;

    constructor(token: string | undefined | null = null, url?: string) {
        this.baseUrl = url || config.api_back_url;
        this.token = token;
    }

    get prefix() {
        return '';
    }

    async http(endpoint: string, {
        body,
        headers,
        ...params
    }: any) {
        // console.log('endpointt: ', this.baseUrl + this.prefix + endpoint);

        const head = {
            Authorization: `Bearer ${this.token}`,
            ...headers,
        };

        return fetch(this.baseUrl + this.prefix + endpoint, {
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                ...head,
            },
            ...params,

        })
            .then((response: any) => {
                if (!response.ok) {
                    return response.json()
                        .then((data: any) => {
                            throw {
                                status: response.status,
                                statusText: response.statusText,
                                data,
                            };
                        });
                }

                return response.json()
                    .then((data: any) => ({
                        data: data.data,
                        status: response.status,
                    }));
            });
    }
}

//HERE IS THE DEFAULT AND MY CUSTOM NEST SERVICE< BUT ONLY WITH THE MANDATORY URL
export default Service;
