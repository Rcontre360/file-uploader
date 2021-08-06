//import axios from 'axios'

class Api {
  static send = ({url, baseUrl}: {url: string; baseUrl?: string}) =>
    new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (url === 'fail') reject(new Error('fail'));
        else resolve({message: 'success'});
      }, 500);
    });
}

export default Api;
