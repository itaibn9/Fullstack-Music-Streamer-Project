import axios from 'axios';
import Cookies from 'js-cookie';

const network = axios.create({});

const getToken = () => Cookies.get('accessToken');

network.interceptors.request.use((config) => {
  config.headers.Authorization = `bearer ${getToken()}`;
  return config;
});

network.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    const originalRequest = error.config;

    if (status === 408) {
      await network.post('/server/api/user/token', {
        token: Cookies.get('refreshToken'),
      });
      const data = await network(originalRequest);
      return data;
    }
    throw error;
  },
);

export default network;