import axios, {AxiosRequestConfig} from 'axios';

class Api {
  static headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/json',
  };

  static send = (req: AxiosRequestConfig) => {
    return axios({
      ...req,
      baseURL: 'http://10.0.2.2:3555',
      headers: Api.headers,
    });
  };
  static setHeaders = (
    headerFields: Partial<AxiosRequestConfig['headers']>,
  ) => {
    Api.headers = {...Api.headers, ...headerFields};
  };
}

export default Api;
