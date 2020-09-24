const { DELETE_PRODUCT } = require('./utils/productQueries');
const sendQuery = require('./utils/sendQuery');
const formatRes = require('./utils/formatRes');

exports.handler = async (event) => {
  const { _id: id } = JSON.parse(event.body);
  const variables = { id };

  if (event.httpMethod !== 'DELETE') {
    return formatRes(405, 'Method Not Allowed');
  }
  try {
    const res = await sendQuery(DELETE_PRODUCT, variables);
    return formatRes(200, res);
  } catch (err) {
    console.error(err);
    return formatRes(500, { err: 'Error: Something went wrong' });
  }
};
