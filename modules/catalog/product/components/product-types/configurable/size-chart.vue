<template>
    <div>
      <div id="size-chart">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="product in products" :key="product.id">
            <div class="product-info-img"> 
              <div class="product-details-img">
                <div v-if="product.custom_attributes">
                  <img :src="getProductImageUrl1(product.custom_attributes)" class="size_img"/>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        const url = window.location.href;
        // Create a URL object
        const urlObject = new URL(url);
        // Get the pathname from the URL
        const pathname = urlObject.pathname;
        // Use string manipulation to extract the file name
        const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
        const product_sku = fileName.replace(/\.html$/, '');
    try {
     
      let apiUrl = `https://magento-1150741-4004803.cloudwaysapps.com/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${product_sku}`;
      // if (this.typeFilter) {
      //   apiUrl += `&searchCriteria[filter_groups][1][filters][0][field]=type_id&searchCriteria[filter_groups][1][filters][0][value]=simple`;
      // } else {
      //   apiUrl += `&searchCriteria[filter_groups][1][filters][0][field]=type_id&searchCriteria[filter_groups][1][filters][0][value]=simple`;
      // }
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
    getProductImageUrl1(customAttributes) {
    if (customAttributes && Array.isArray(customAttributes)) {
      const productVideoAttribute = customAttributes.find(attr => attr.attribute_code === 'size_chart');
      if (productVideoAttribute) {
        return productVideoAttribute.value; // Assuming 'product_video' contains the video URL.
      }
    }
    return ''; // Return an empty string if no video URL is available.
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
  .product-info-video.bottom {
    margin-bottom: -4px;
}
.product-details-img img {
    width: 100%;
}
#size-chart {
    width: 80%;
    margin: auto;
    margin-top: 5%;
}
  </style>