const { GET_PRODUCTS } = require('./utils/productQueries');
const sendQuery = require('./utils/sendQuery');
const formatRes = require('./utils/formatRes');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return formatRes(405, 'Method Not Allowed');
  }
  try {
    const res = await sendQuery(GET_PRODUCTS);
    const data = res.allProducts.data;
    return formatRes(200, data);
  } catch (err) {
    console.error(err);
    return formatRes(500, { err: 'Error: Something went wrong' });
  }
};
