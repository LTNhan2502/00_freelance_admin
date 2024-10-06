import instance from './axios.config.js'

const getAllProduct = () => {
    const URL_API = "/v1/api/product";
    return instance.get(URL_API);
}


const CreateProduct = (formData) => {
    const URL_API = "/v1/api/product";
    return instance.post(URL_API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export { getAllProduct, CreateProduct }
