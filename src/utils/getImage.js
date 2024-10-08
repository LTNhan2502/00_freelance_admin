import instance from './axios.config.js'

const getImages = (image) => {
   const URL_API = `/v1/api/get-image/${image}`;
   return instance.get(URL_API, {
      responseType: 'blob' // Thiết lập kiểu phản hồi là blob
   });
}
export { getImages }
