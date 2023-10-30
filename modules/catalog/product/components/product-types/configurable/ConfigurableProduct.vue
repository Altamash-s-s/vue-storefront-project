<template>
  <div class="product inside-product">
    <Videoapi />
    <SfLoader
      class="loading--product-gallery "
      :loading="isFetching"
    >

      
      <SfGallery
        :images="productGallery"
        :image-width="imageSizes.productGallery.imageWidth"
        :image-height="imageSizes.productGallery.imageHeight"
        :thumb-width="imageSizes.productGallery.thumbWidth"
        :thumb-height="imageSizes.productGallery.thumbHeight"
        :enable-zoom="false"
        image-tag="nuxt-img"
        thumb-image-tag="nuxt-img"
        class="product__gallery"
        direction="vertical"
        :nuxt-img-config="{
          fit: 'cover',
        }"
        :thumb-nuxt-img-config="{
          fit: 'cover',
        }"
      />
    </SfLoader>
    <div class="product__info">
      <div class="product__header">
        <SfHeading
          :title="getProductName(product)"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <SvgImage
          icon="drag"
          width="40"
          height="40"
          class="product__drag-icon smartphone-only"
        />
      </div>
      <div class="product__price-and-rating">
        <SfPrice
          :regular="$fc(productPrice)"
          :special="productSpecialPrice && $fc(productSpecialPrice)"
        />
        <div>
          <div class="product__rating">
            <SfRating
              :score="averageRating"
              :max="5"
            />
            <a
              v-if="!!totalReviews"
              href="#"
              class="product__count"
            >
              ({{ totalReviews }})
            </a>
          </div>
          <SfButton
            class="sf-button--text"
            @click="setActiveTab(TabsConfig.reviews.ID)"
          >
            {{ $t('Read all reviews') }}
          </SfButton>
          |
          <SfButton
            class="sf-button--text"
            @click="openNewReviewTab"
          >
            {{ $t('Add a review') }}
          </SfButton>
        </div>
      </div>
      <div v-if="product !== null ">
        <HTMLContent
          v-if="productShortDescription"
          :content="productShortDescription"
          tag="p"
          class="product__description desktop-only"
        />
        <template v-for="option in configurableOptions">
          <div
            v-if="option.attribute_code === 'color'"
            :key="option.uid"
            class="product__colors"
          >
            <p class="product__color-label">
              {{ option.label }}:
            </p>
            <SfColor
              v-for="color in option.values"
              :key="color.uid"
              :color="getProductSwatchData(color.swatch_data)"
              :color-uid="color.uid"
              :selected="
                productConfiguration[option.attribute_uid] === color.uid
              "
              class="product__color"
              @click="
                () =>
                  updateProductConfiguration(
                    option.attribute_uid,
                    color.uid
                  )
              "
            />
            <button @click="shareProduct" class="share-btn">
                     <svg height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg">
                      <title></title>
                           <path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z"></path>
                            </svg>
                         Share
                      </button>


                      
          </div>

         
          
          

      
          <!-- <div
            v-if="option.attribute_code === 'size'"
            :key="option.uid"
            class="product__size"
          >
            <p class="product__color-label">
              {{ option.label }}:
            </p>
            <SfColor
              v-for="size in option.values"
              :key="size.uid"
              :size="getProductSwatchData(size.swatch_data)"
              :size-uid="size.uid"
              :selected="
                productConfiguration[option.attribute_uid] === size.uid
              "
              class="product__color"
              @click="
                () =>
                  updateProductConfiguration(
                    option.attribute_uid,
                    size.uid
                  )
              "
            />
          </div> -->

          <!-- <div v-else :key="option.uid" class="product__sizes">
            <p class="product__size-label">{{ option.label }}:</p>
            <div class="product__size-checkboxes">
              <SfCheckbox
                v-for="size in option.values"
                :key="size.uid"
                :label="size.label"
                :checked="productConfiguration[option.attribute_uid] === size.uid"
                @change="updateProductConfiguration(option.attribute_uid, size.uid)"
              />
            </div>
          </div> -->
          
          <div v-else-if="option.attribute_code === 'size'" :key="option.uid" class="product__sizes">
      <p class="product__size-label">{{ option.label }}:</p>
      <SfSizeSwatch
        v-for="attribute in option.values"
        :key="attribute.uid"
        :label="attribute.label"
        :value="attribute.uid"
        :selected="productConfiguration[option.attribute_uid] === attribute.uid"
        @input="($event) => updateProductConfiguration(option.attribute_uid, $event)"
      />
      <div class="size-chart-btn">
                        <popup />
                      </div>
      
    </div>

    

    <div v-else-if="option.attribute_code === 'fit'" :key="option.uid" class="product__fits">
      <p class="product__fit-label">{{ option.label }}:</p>
      <SfFitSwatch
        v-for="attribute in option.values"
        :key="attribute.uid"
        :label="attribute.label"
        :value="attribute.uid"
        :selected="productConfiguration[option.attribute_uid] === attribute.uid"
        @input="($event) => updateProductConfiguration(option.attribute_uid, $event)"
      />
    </div>

        </template>
        <SfAddToCart
          v-model="qty"
          v-e2e="'product_add-to-cart'"
          :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching"
          class="product__add-to-cart"
        >
          <template #add-to-cart-btn>
            <SfButton
              class="sf-add-to-cart__button"
              :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching"
              @click="addItem({ product, quantity: parseInt(qty), productConfiguration })"
            >
              {{ $t('Add to cart') }}
            </SfButton>
          </template>
        </SfAddToCart>
        <SfAlert
          :style="{ visibility: !!addToCartError ? 'visible' : 'hidden'}"
          class="product__add-to-cart-error"
          :message="$t(addToCartError)"
          type="danger"
        />
        <div class="product__additional-actions">
          <AddToWishlist
            :is-in-wishlist="isInWishlist"
            :is-show="isAuthenticated"
            @addToWishlist="addItemToWishlist({product})"
          />
        </div>
      </div>
      <LazyHydrate when-idle>
        <ProductTabs
          :product="product"
          :open-tab="activeTab"
          @changeTab="setActiveTab($event)"
        />
      </LazyHydrate>
      
    </div>  
  </div>
  
</template>
<script lang="ts">

import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAddToCart,
  SfButton,
  SfColor,
  SfSize,
  SfGallery,
  SfHeading,
  SfLoader,
  SfPrice,
  SfRating,
  SfSelect,
  SfAlert,
  SfCheckbox,
} from '@storefront-ui/vue';


import {
  ref,
  computed,
  useContext,
  useRoute,
  useRouter,
  defineComponent,
  PropType, toRef,
} from '@nuxtjs/composition-api';

import {
  getSwatchData as getProductSwatchData,
  getName as getProductName,
} from '~/modules/catalog/product/getters/productGetters';

import {
  getTotalReviews,
  getAverageRating,
} from '~/modules/review/getters/reviewGetters';

import { useCart } from '~/modules/checkout/composables/useCart';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import SvgImage from '~/components/General/SvgImage.vue';
import HTMLContent from '~/components/HTMLContent.vue';
import AddToWishlist from '~/components/AddToWishlist.vue';
import { useUser } from '~/modules/customer/composables/useUser';
import { getConfigurableProductPriceCommand } from '~/modules/catalog/pricing/getConfigurableProductPriceCommand';
import { getConfigurableProductSpecialPriceCommand } from '~/modules/catalog/pricing/getConfigurableProductSpecialPriceCommand';
import { Product } from '~/modules/catalog/product/types';
import ProductTabs from '~/modules/catalog/product/components/tabs/ProductTabs.vue';
import { useProductGallery } from '~/modules/catalog/product/composables/useProductGallery';
import { TabsConfig, useProductTabs } from '~/modules/catalog/product/composables/useProductTabs';
import { usePageStore } from '~/stores/page';
import SfSizeSwatch from './SfSizeSwatch.vue';
import SfFitSwatch from './SfSizeSwatch.vue';
import videoapi from './videoapi.vue';
import popup from './popup.vue';


import '../inside_product.css';
import Videoapi from './videoapi.vue';


export default defineComponent({
  name: 'ConfigurableProduct',
  components: {
    videoapi,
    popup,
    SfFitSwatch,
    SfSizeSwatch,
    HTMLContent,
    LazyHydrate,
    SfAddToCart,
    SfButton,
    SfColor,
    SfSize,
    SfGallery,
    SfHeading,
    SfLoader,
    SfPrice,
    SfRating,
    SfSelect,
    SfAlert,
    SfCheckbox,
    AddToWishlist,
    SvgImage,
    ProductTabs,
    Videoapi
},
  transition: 'fade',
  props: {
    product: {
      type: [Object, null] as PropType<Product>,
      default: null,
    },
    isFetching: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const qty = ref(1);
    const product = toRef(props, 'product');
    const route = useRoute();
    const router = useRouter();
    const { routeData } = usePageStore();
    const {
      addItem, error: cartError, loading: isCartLoading, canAddToCart,
    } = useCart();
    const { productGallery, imageSizes } = useProductGallery(product);
    const { activeTab, setActiveTab, openNewReviewTab } = useProductTabs();

    const { isAuthenticated } = useUser();
    const { addOrRemoveItem, isInWishlist } = useWishlist();
    const { app } = useContext();

    const productShortDescription = computed(
      () => props.product?.short_description?.html || '',
    );

    const configurableOptions = computed(
      () => props.product?.configurable_options ?? [],
    );

    const isOptionSelected = (attributeUid, valueUid) => {
      // Check if the option is selected based on its attribute and value UIDs
      return productConfiguration[attributeUid] === valueUid;
    };

    const productConfiguration = ref(route.value.query);
    const productPrice = computed(() => getConfigurableProductPriceCommand(props.product));
    const productSpecialPrice = computed(() => getConfigurableProductSpecialPriceCommand(props.product));

    const getBaseSearchQuery = () => ({
      filter: {
        sku: {
          eq: routeData.sku,
        },
      },
      configurations: Object.entries(productConfiguration.value).map(
        (config) => config[1],
      ) as string[],
    });


    const totalReviews = computed(() => getTotalReviews(props.product));
    const averageRating = computed(() => getAverageRating(props.product));
    const addToCartError = computed(() => cartError.value?.addItem?.message);
    const updateProductConfiguration = (label: string, value: string) => {
      if (productConfiguration.value[label] === value) return;

      productConfiguration.value[label] = value;
      const routerData = router.resolve({
        path: `${app.localePath(window.location.pathname)}`,
        query: {
          ...productConfiguration.value,
        },
      });

      window.history.pushState({}, null, routerData.href);

      emit('fetchProduct', { query: getBaseSearchQuery() });
    };

    const shareProduct = () => {
  const productName = getProductName(product);
  const productURL = window.location.href;

  // Create a custom message for sharing
  const shareMessage = `Check out this amazing product: ${productName}`;

  // Create a WhatsApp share link
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}%0A${encodeURIComponent(productURL)}`;

  // Create an Instagram share link
  const instagramURL = `https://www.instagram.com/share?url=${encodeURIComponent(productURL)}&title=${encodeURIComponent(shareMessage)}`;

  // Check if the Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: productName,
      text: shareMessage,
      url: productURL,
    })
      .then(() => console.log('Product shared successfully.'))
      .catch((error) => console.error('Error sharing product:', error));
  } else {
    // Fallback for browsers that do not support Web Share API
    window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab or window
    window.open(instagramURL, '_blank'); // Open Instagram in a new tab or window
  }
};



    return {
      shareProduct,
      SfFitSwatch,
      SfSizeSwatch,
      addItem,
      addItemToWishlist: addOrRemoveItem,
      canAddToCart,
      configurableOptions,
      updateProductConfiguration,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: props.product })),
      isCartLoading,
      productConfiguration,
      productGallery,
      getProductName,
      getProductSwatchData,
      productPrice,
      productShortDescription,
      productSpecialPrice,
      qty,
      totalReviews,
      averageRating,
      imageSizes,
      setActiveTab,
      openNewReviewTab,
      activeTab,
      TabsConfig,
      addToCartError,
      isOptionSelected,
    };
  },
});
</script>
<style lang="scss">
@import '../styles.scss';





.product {
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
        --product-color-font,
        var(--font-weight--normal),
        var(--font-size--lg),
        1.6,
        var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);

    @include for-mobile {
      margin-left: var(--spacer-sm);
    }
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
    width: 45px;
    height: 45px;
    float: left;
    padding: 7px;
    margin-right: 9px;
    border: 1px solid #000;
  }
}
.product__sizes {
  display: block;
    margin-top: 85px;
}
.product__size-label {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 18px;
    color: #1d1f22;
    margin-bottom: 7px;
}
.product__fits {
    display: block;
    margin-top: 30px;
}
.product__fit-label {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 18px;
    line-height: 29px;
    color: #1d1f22;
    margin-bottom: 7px;
    margin-top: -15px;
}
.product__colors{
  display: block;
}
.product__color-label{
  width: 100px;
}
.share-btn {
  float: right;
    padding: 15px;
    background-color: #FFF;
    font-size: 16px;
    font-family: 'Raleway';
    border: 1px solid;
    width: 100px;
    height: 50px;
    background-color: #FFF;
    border-radius: 0px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    transition: all 0.3s;
    border: 1px solid rgb(204, 204, 204);
}
.sf-color.is-active, .sf-color:hover{
  transform: scale(1.2) !important;
    --color-box-shadow-opacity: 0.25 !important;
    border: 1px double #000 ;
    outline: 4px solid #fff;
    outline-offset: -5px;
}
.size-chart-btn {
    float: right;
    margin-top: -30px;
}
.sf-add-to-cart.product__add-to-cart {
    margin-left: 0;
    margin-right: 0;
    margin-top: 30px;
}
h3.sf-heading__title.h3 {
    font-size: 40px;
}
.sf-price__regular {
    font-size: 25px;
}
</style>