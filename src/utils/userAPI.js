import instance from "./axios.config";

const getUser = () => {
   const URL_API = "/v1/api/user";
   return instance.get(URL_API);
}

// const createUser = (userName, password) => {
//    const URL_API = "/v1/api/login";
//    const data = { userName, password }
//    return instance.post(URL_API, data);
// }

export { getUser }