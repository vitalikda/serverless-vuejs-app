<template>
  <div class="about">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Products example</h1>
        <!-- <p class="lead text-muted">Here will be a form</p> -->
        <p>
          <a v-show="!form" @click="showForm" class="btn btn-primary m-2"
            >Add product</a
          >
          <a v-show="form" @click="showForm" class="btn btn-secondary m-2"
            >Close form</a
          >
        </p>
        <!-- Product form -->
        <form v-show="form" class="text-left col-6 mx-auto mb-5" ref="form">
          <div v-show="item._id" class="mb-3 row">
            <label for="inputId" class="col-sm-2 col-form-label">ID</label>
            <div class="col-sm-10">
              <input
                v-model="item._id"
                type="text"
                readonly
                class="form-control-plaintext"
                id="inputId"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="inputName" class="form-label">Name</label>
            <input
              v-model="item.name"
              type="text"
              class="form-control"
              id="inputName"
            />
          </div>
          <div class="mb-3">
            <label for="inputDescription" class="form-label">Description</label>
            <textarea
              v-model="item.description"
              class="form-control"
              id="inputDescription"
              rows="2"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="inputPrice" class="form-label">Price</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                v-model.number="item.price"
                type="number"
                step="0.01"
                class="form-control"
                id="inputPrice"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="inputQuantity" class="form-label">Quantity</label>
            <input
              v-model.number="item.quantity"
              type="number"
              class="form-control"
              id="inputQuantity"
            />
          </div>
          <div class="mb-3">
            <label for="inputBackorderLimit" class="form-label"
              >Backorder Limit</label
            >
            <input
              v-model.number="item.backorderLimit"
              type="number"
              class="form-control"
              id="inputBackorderLimit"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              v-model.number="item.backordered"
              type="checkbox"
              class="form-check-input"
              id="checkBackordered"
            />
            <label class="form-check-label" for="checkBackordered"
              >Backordered</label
            >
          </div>
          <button
            @click.prevent="clearForm"
            type="submit"
            class="btn btn-secondary mr-2"
          >
            Clear
          </button>
          <button
            v-if="item._id"
            @click.prevent="updateItem"
            type="submit"
            class="btn btn-primary"
          >
            Update
          </button>
          <button
            v-else
            @click.prevent="createItem"
            type="submit"
            class="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
    <!-- Products table -->
    <section>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>${{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <div class="btn-group btn-group-sm" role="group">
                  <button
                    @click="updateProduct(item._id)"
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteProduct(item._id)"
                    type="button"
                    class="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
// import ProductForm from '@/components/ProductForm';

export default {
  name: 'About',
  // components: { ProductForm },
  data() {
    return { items: [], item: {}, form: false, error: '' };
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
      return data;
    },
    updateProduct(id) {
      this.item = this.items.find((o) => o._id === id);
      this.form = true;
    },
    async deleteProduct(id) {
      await axios('/api/deleteProduct', {
        method: 'DELETE',
        data: {
          _id: id,
        },
      });
      this.items = await this.getProducts();
    },
    // Methods for Product form
    showForm() {
      this.clearForm();
      this.form = !this.form;
    },
    clearForm() {
      this.item = {};
    },
    async createItem() {
      await axios('/api/createProduct', {
        method: 'POST',
        data: {
          name: this.item.name,
          description: this.item.description,
          price: this.item.price,
          quantity: this.item.quantity,
          backorderLimit: this.item.backorderLimit,
          backordered: this.item.backordered,
        },
      });
      this.items = await this.getProducts();
    },
    async updateItem() {
      await axios('/api/updateProduct', {
        method: 'PUT',
        data: {
          _id: this.item._id,
          name: this.item.name,
          description: this.item.description,
          price: this.item.price,
          quantity: this.item.quantity,
          backorderLimit: this.item.backorderLimit,
          backordered: this.item.backordered,
        },
      });
      this.clearForm();
    },
  },
};
</script>
