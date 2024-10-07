import instance from "./axios.config";

const getUser = () => {
   const URL_API = "/v1/api/user";
   return instance.get(URL_API);
}

// Update amout user
const updateAmountUser = (userId, amount) => {
   const URL_API = "/v1/api/update-amout";
   const data = { userId, amount }
   return instance.post(URL_API, data);
}


// const createUser = (userName, password) => {
//    const URL_API = "/v1/api/login";
//    const data = { userName, password }


//    return instance.post(URL_API, data);
// }

export { getUser, updateAmountUser }