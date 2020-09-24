const { CREATE_PRODUCT } = require('./utils/productQueries');
const sendQuery = require('./utils/sendQuery');
const formatRes = require('./utils/formatRes');

exports.handler = async (event) => {
  const { name, description, price, quantity, backorderLimit } = JSON.parse(
    event.body
  );
  const variables = {
    name,
    description,
    price,
    quantity,
    backorderLimit,
    backordered: false,
  };

  if (event.httpMethod !== 'POST') {
    return formatRes(405, 'Method Not Allowed');
  }
  try {
    const res = await sendQuery(CREATE_PRODUCT, variables);
    return formatRes(200, res);
  } catch (err) {
    console.error(err);
    return formatRes(500, { err: 'Error: Something went wrong' });
  }
};
