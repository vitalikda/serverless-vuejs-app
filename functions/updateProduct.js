const { UPDATE_PRODUCT } = require('./utils/productQueries');
const sendQuery = require('./utils/sendQuery');
const formatRes = require('./utils/formatRes');

exports.handler = async (event) => {
  const {
    _id: id,
    name,
    description,
    price,
    quantity,
    backorderLimit,
    backordered,
  } = JSON.parse(event.body);
  const variables = {
    id,
    name,
    description,
    price,
    quantity,
    backorderLimit,
    backordered,
  };

  if (event.httpMethod !== 'PUT') {
    return formatRes(405, 'Method Not Allowed');
  }
  try {
    const res = await sendQuery(UPDATE_PRODUCT, variables);
    return formatRes(200, res);
  } catch (err) {
    console.error(err);
    return formatRes(500, { err: 'Error: Something went wrong' });
  }
};
