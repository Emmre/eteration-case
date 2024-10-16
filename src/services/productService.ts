import axios from "axios";

export const fetchProductList = async () => {
  const res = await axios.get(
    "https://5fc9346b2af77700165ae514.mockapi.io/products"
  );
  return res;
};

export const fetchProductById = async (id: string) => {
  const res = await axios.get(
    `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
  );
  return res.data;
};

export const fetchProductsByPage = async (page: number) => {
  const res = await axios.get(
    `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}`
  );
  return res.data;
};
