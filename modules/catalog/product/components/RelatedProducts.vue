<template>
  <div>
    <h2 class="rltd-head related_prd_hd">#Don't Miss These Collection</h2>
    <ProductsCarousel
      v-if="!loading && products && products.length > 0"
      :products="products"
      
    />
    <VideoBottom />
    </div>
  </template>
  <script lang="ts">
  import {
    defineComponent, ref, onMounted,
  } from '@nuxtjs/composition-api';
  import useRelatedProducts from '~/modules/catalog/product/composables/useRelatedProducts';
  import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';
  import { usePageStore } from '~/stores/page';
import VideoBottom from './product-types/configurable/video-bottom.vue';
  
  export default defineComponent({
    name: 'RelatedProducts',
    components: {
    ProductsCarousel,
    VideoBottom
},
    setup() {
      const { routeData } = usePageStore();
      const {
        search,
        loading,
      } = useRelatedProducts();
      const products = ref([]);
  
      onMounted(async () => {
        const baseSearchQuery = {
          filter: {
            sku: {
              eq: routeData.sku,
            },
          },
        };
  
        products.value = await search(baseSearchQuery);
      });
  
      return {
        products,
        loading,
      };
    },
  });
  </script>
  <style >
  .rltd-head {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 70px;
      margin-bottom: 90px;
  }
  li.sf-carousel-item.glide__slide.carousel__item.glide__slide--clone {
      width: 239px !important;
  }
  .related_prd_hd {
    text-align: center;
  }
  .sf-product-card__price.sf-price {
    display: flex;
    justify-content: center;
}
  </style>