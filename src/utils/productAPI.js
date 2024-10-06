import instance from './axios.config.js'

const getAllProduct = () => {
    const URL_API = "/v1/api/product";
    return instance.get(URL_API);
}


const CreateProduct = (imageProduct, productName, price, quantity) => {
    const URL_API = "/v1/api/product";
    const data = { imageProduct, productName, price, quantity }
    return instance.post(URL_API, data);
}

export { getAllProduct, CreateProduct }
