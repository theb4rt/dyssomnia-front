import config from '../config';

// const response_maker = (data: IDefaultResponse) => {
//     if (data.status === 200) {
//         return {
//             data: data.payload,
//             status: data.status,
//         };
//     }
//     if (data.status === 401 && data.estado === false) {
//         throw {
//             status: data.status,
//             message: data.mensaje,
//         };
//     } else {
//         throw {
//             status: data.status,
//             message: data.mensaje,
//         };
//     }
// };
class Service {
    baseUrl: string;
    token: string | undefined | null;

    constructor(token: string | undefined | null = null) {
        this.baseUrl = config.api_url;
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

export default Service;
