//import axios from 'axios'

type URL = '/users' | '/error' | '/userData';
type Request = {
  url: URL;
  method?: 'get' | 'post';
  data?: unknown;
  query?: string;
};

class Api {
  static send = ({url, method}: Request) =>
    new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (url === '/error') reject(new Error('fail'));
        if (url === '/users')
          resolve({
            data: {name: 'user', token: 'token', email: '@email.cmo', id: ''},
          });
      }, 500);
    });
}

export default Api;
