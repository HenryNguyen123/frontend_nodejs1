import axios from 'axios'
import { toast } from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_LOCALHOST_API
});


//send cookie up to server
instance.defaults.withCredentials= true

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('JWT');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/////// Interceptors
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;   
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let status = error.response?.status || 500
    console.log(status)
  switch (status) {
      case 400:
        toast.error('The request was invalid. Please check your input.');
        break;
      case 401:
        toast.error('You are not logged in. Please sign in to continue.');
        // window.location.href = '/login'
        break;
      case 403:
        toast.error('You do not have permission to access this resource.');
        break;
      case 404:
        toast.error('The requested resource could not be found.');
        break;
      case 408:
        toast.error('The request took too long. Please try again.');
        break;
      case 429:
        toast.error('You’ve sent too many requests. Please slow down.');
        break;
      case 500:
        toast.error('Something went wrong on the server. Please try again later.');
        break;
      case 502:
        toast.error('The server received an invalid response.');
        break;
      case 503:
        toast.error('The server is currently unavailable. Please try again later.');
        break;
      case 504:
        toast.error('The server is taking too long to respond. Try again soon.');
        break;
      default:
        toast.error('An unexpected error occurred. Please try again later.');
    }

    return Promise.reject(error);
});

  export default instance