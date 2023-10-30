<template>
    <div>
      <div id="productlist">
        <h1>Product List</h1>
        <div v-if="loading">Loading...</div>
        <ul v-else>
          <li v-for="product in products" :key="product.id">
            <div class="product-info">
              <img class="prd_img" :src="getImageUrl(product.media_gallery_entries)" alt="Product Image" />
              <div class="product-details">
                <h2>{{ product.name }}</h2>
                <a :href="getProductLink(product.sku)">{{ product.sku }}</a>
                <p>Price: {{ product.price }}</p>
                <p>Product Count: {{ product.extension_attributes.product_count }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="error" class="error-message">Error fetching products: {{ error }}</div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    props: {
      typeFilter: String,
    },
    data() {
      return {
        products: [],
        loading: true,
        error: null,
      };
    },
    async mounted() {
    try {
      const categoryId = 95;
      let apiUrl = `https://magento-1082361-3805878.cloudwaysapps.com/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}`;
      if (this.typeFilter) {
        apiUrl += `&searchCriteria[filter_groups][1][filters][0][field]=type_id&searchCriteria[filter_groups][1][filters][0][value]=simple`;
      } else {
        apiUrl += `&searchCriteria[filter_groups][1][filters][0][field]=type_id&searchCriteria[filter_groups][1][filters][0][value]=simple`;
      }
      const response = await axios.get(apiUrl);
      this.products = response.data.items;
    } catch (error) {
      this.error = error.message;
      console.error('Error fetching products:', error);
    } finally {
      this.loading = false;
    }
  },
    methods: {
      getImageUrl(mediaGalleryEntries) {
        if (mediaGalleryEntries && mediaGalleryEntries.length > 0) {
          const filePath = mediaGalleryEntries[0].file;
          const baseMediaUrl = 'https://magento-1082361-3805878.cloudwaysapps.com/pub/media/catalog/product';
          return `${baseMediaUrl}${filePath}`;
        }
        return 'https://example.com/placeholder-image.jpg';
      },
      getProductLink(sku) {
        const baseUrl = 'http://localhost:3000/';
        return baseUrl + sku + '.html';
      },
    },
  };
  </script>
  <style scoped>
  .product-info {
    display: flex;
    align-items: center;
  }
  .product-details {
    margin-left: 20px;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  .prd_img{
   width: 20%;
  }
  </style>