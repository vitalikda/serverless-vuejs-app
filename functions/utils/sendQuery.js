require('dotenv').config();
const axios = require('axios');

module.exports = async (query, variables) => {
  const url = 'https://graphql.fauna.com/graphql';
  const { FAUNA_SECRET_KEY } = process.env;

  const {
    data: { data, errors },
  } = await axios({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${FAUNA_SECRET_KEY}`,
    },
    data: {
      query,
      variables,
    },
  });
  if (errors) {
    console.error(errors);
    throw new Error('Something went wrong');
  }
  return data;
};

// // Send json response
// const send = (statusCode, body) => {
//   callback(null, {
//     statusCode,
//     body: JSON.stringify(body),
//   });
// };

// // Perform API call
// const getProducts = () => {
//   axios({
//     method: 'POST',
//     url: URL,
//     data: {
//       query, //: JSON.stringify({ query }),
//       variables,
//     },
//     headers: {
//       Authorization: `Bearer ${FAUNA_SECRET_KEY}`,
//     },
//   })
//     .then((res) => send(res.status, res.data.data.allProducts.data))
//     .catch((err) => {
//       if (err.response) {
//         // client received an error response (5xx, 4xx)
//         // console.log(err.response.data);
//         console.log(err.response.status);
//         console.log(err.response.headers);
//         console.log(err.toJSON());
//         send(err.response.status, err.toJSON().message);
//       } else if (err.request) {
//         // client never received a response, or request never left
//         console.log(err.request);
//       } else {
//         console.log(err.config);
//       }
//     });
// };

// // Make sure method is GET
// if (event.httpMethod == 'GET') {
//   // Run
//   getProducts();
// } else {
//   return send(405, 'Method Not Allowed');
// }
