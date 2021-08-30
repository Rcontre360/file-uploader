import axios, {AxiosRequestConfig} from 'axios';

class Api {
  static headers: AxiosRequestConfig['headers'] = {};

  static send = (req: AxiosRequestConfig) => {
    console.log(req, process.env.API_URL);
    return axios({...req, baseURL: 'http://10.0.2.2:3555'});
  };
  static setHeaders = (
    headerFields: Partial<AxiosRequestConfig['headers']>,
  ) => {
    Api.headers = {...Api.headers, ...headerFields};
  };
}

export default Api;
