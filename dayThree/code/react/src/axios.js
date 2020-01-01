import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = "";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);

/*
 * 设置请求拦截器 
 * TOKEN校验（JWT）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(config => {
	let token = localStorage.getItem('token');
	token && (config.headers.Authorization = token);
	return config;
}, error => {
	return Promise.reject(error);
});

/*
 * 响应拦截器 
 */
axios.interceptors.response.use(response => {
	return response.data;
}, error => {});

export default axios;