import instance from './axios.config.js'

const loginAdmin = (userName, password) => {
   const URL_API = "/v1/api/loginAdmin";
   const data = { userName, password }
   return instance.post(URL_API, data);
}

const getAllUsersAdmin = () => {
   const URL_API = "/v1/api/userAdmin";
   return instance.get(URL_API);
}

export { loginAdmin, getAllUsersAdmin }
