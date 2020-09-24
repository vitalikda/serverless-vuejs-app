const GET_PRODUCTS = `
  query {
    allProducts {
      data {
        _id
        name
        description
        price
        quantity
        backorderLimit
        backordered
      }
    }
  }
`;

const CREATE_PRODUCT = `
  mutation(
    $name: String!,
    $description: String!,
    $price: Float!,
    $quantity: Int!,
    $backorderLimit: Int!
  ) {
    createProduct(data: { 
      name: $name, 
      description: $description, 
      price: $price, 
      quantity: $quantity,
      backorderLimit: $backorderLimit,
      backordered: false
    }) {
      name
      description
      price
      quantity
      backorderLimit
      backordered
    }
  }
`;

const UPDATE_PRODUCT = `
  mutation(
    $id: ID!,
    $name: String!,
    $description: String!,
    $price: Float!,
    $quantity: Int!,
    $backorderLimit: Int!,
    $backordered: Boolean!
  ) {
    updateProduct(id: $id, data: { 
      name: $name, 
      description: $description, 
      price: $price, 
      quantity: $quantity,
      backorderLimit: $backorderLimit,
      backordered: $backordered
    }) {
      _id
      name
      description
      price
      quantity
      backorderLimit
      backordered
    }
  }
`;

const DELETE_PRODUCT = `
  mutation($id: ID!) {
    deleteProduct(id: $id){
      _id
    }
  }
`;

module.exports = {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
