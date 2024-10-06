import instance from './axios.config.js'

const loginAdmin = (userName, password) => {
   const URL_API = "/v1/api/loginAdmin";
   const data = { userName, password }
   return instance.post(URL_API, data);
}

export { loginAdmin }
