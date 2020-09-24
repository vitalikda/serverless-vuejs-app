<template>
  <div class="about">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Products example</h1>
        <p class="lead text-muted">Here will be a form</p>
        <p>
          <a href="#" class="btn btn-primary m-2">Add product</a>
          <a href="#" class="btn btn-secondary m-2">Update product</a>
          <a href="#" class="btn btn-danger m-2">Delete product</a>
        </p>
      </div>
    </section>
    <section>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>${{ item.price }}</td>
              <td>{{ item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'About',
  data() {
    return { items: [], error: '' };
  },
  async created() {
    try {
      this.items = await this.getProducts();
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    async getProducts() {
      const res = await axios.get('/api/getProducts');
      const data = res.data;
      console.log(data);
      return data;
    },
  },
};
</script>
