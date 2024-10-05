//Data trả về dạng đối tượng duy nhất, không phải mảng đối tượng

//Lấy ra sản phẩm gần đây
export const getRecentProduct = () => {
    return fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
}

//Lấy ra tất cả sản phẩm
export const getAllProduct = () => {
    return fetch('https://dummyjson.com/products')
    .then(res => res.json())
}

//Lấy ra sản phẩm chỉ định
export const getTargetProduct = (id) => {
    return fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
}

//Thêm sản phẩm
export const addProduct = (productData) => {
    return fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    }).then(res => res.json());
};

