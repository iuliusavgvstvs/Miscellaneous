export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    //any async code
    const response = await fetch('https://rn-shop-server-8d13e-default-rtdb.europe-west1.firebasedatabase.app/products.json');

    const responseData = await response.json();
    console.log(responseData);
      //dispatch({type: SET_PRODUCTS, products: []});
  }
}

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    //any async code
    const response = await fetch('https://rn-shop-server-8d13e-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    const responseData = await response.json();

    console.log(responseData)
     
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
