<!-- <template>
  <SfFooter
    :column="4"
    multiple
    class="footer"
  >
    <SfFooterColumn :title="$t('About us')">
      <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Departments')">
      <SfList>
        <SfListItem
          v-for="item in departments"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Help')">
      <SfList>
        <SfListItem
          v-for="item in help"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Payment & Delivery')">
      <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage
          v-for="item in social"
          :key="item"
          class="footer__social-image"
          :src="addBasePath('/icons/'+item+'.svg')"
          :alt="item"
          width="32"
          height="32"
        />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script lang="ts">
import {
  SfFooter, SfList, SfImage, SfMenuItem,
} from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
import { addBasePath } from '~/helpers/addBasePath';

export default defineComponent({
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
  },
  setup() {
    return {
      addBasePath,
    };
  },
  data() {
    return {
      aboutUs: ['Who we are', 'Quality in the details', 'Customer Reviews'],
      departments: ['Women fashion', 'Men fashion', 'Kidswear', 'Home'],
      help: ['Customer service', 'Size guide', 'Contact us'],
      paymentsDelivery: ['Purchase terms', 'Guarantee'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024,
    };
  },
});
</script>

<style lang="scss">

.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
    background-color: #fff;
    border-radius: 100%;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style> -->




<template>
  <div>
      <SfFooter
        :column="1"
        multiple
        class="footer-cst"
      >
        <footerHd />
        <SfFooterColumn >
          <div class="footer__socials">
            <SfImage
              v-for="item in social"
              :key="item"
              class="footer__social-image"
              :src="addBasePath('/icons/' + item + '.svg')"
              :alt="item"
              width="38"
              height="38"
            />
          </div>
        </SfFooterColumn>
        <SfFooterColumn >
          <div class="footer__Newsletter">
            <label for="fname">JOIN OUR NEWSLETTER</label>
            <input class="email-input" placeholder="enter your email address" type="text" id="fname" name="fname">
          </div>
        </SfFooterColumn>
      </SfFooter>
      
    <SfFooter
      :column="4"
      multiple
      class="footer"
    >
    <SfFooterColumn :title="$t('Explore HumanAbstract')" >
        <SfList>
          <SfListItem
            v-for="item in aboutUs"
            :key="item"
          >
            <SfMenuItem
              :label="$t(item)"
            />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('Online Services')">
        <SfList>
          <SfListItem
            v-for="item in departments"
            :key="item"
          >
            <SfMenuItem
              :label="$t(item)"
            />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('Boutique Services')">
        <SfList>
          <SfListItem
            v-for="item in help"
            :key="item"
          >
            <SfMenuItem
              :label="$t(item)"
            />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('The House of Human Abstract')">
        <SfList>
          <SfListItem
            v-for="item in paymentsDelivery"
            :key="item"
          >
            <SfMenuItem
              :label="$t(item)"
            />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
    </SfFooter>
    </div>
  </template>
  <script lang="ts">
  import {
    SfFooter, SfList, SfImage, SfMenuItem,
  } from '@storefront-ui/vue';
  import { defineComponent } from '@nuxtjs/composition-api';
  import { addBasePath } from '~/helpers/addBasePath';
  import footerHd from './footer-hd.vue';
  export default defineComponent({
    components: {
      SfFooter,
      SfList,
      SfImage,
      SfMenuItem,
      footerHd,
    },
    setup() {
      return {
        addBasePath,
      };
    },
    data() {
      return {
        aboutUs: ['Haute Couture', 'Fashion', 'High Jewelry','Fine Jewelry'],
        departments: ['Store Locator'],
        help: ['Report to Society', 'Fighting Counterfeits', 'Financial Results'],
        paymentsDelivery: ['Careers', 'Privacy','Legal','FAQ'],
        social: ['facebook', 'pinterest',  'twitter', 'youtube', 'instagram'],
        isMobile: false,
        desktopMin: 1024,
      };
    },
  });
  </script>
  <style lang="scss">
  .footer {
    margin-bottom: 3.75rem;
    @include for-desktop {
      margin-bottom: 0;
    }
    &__socials {
      display: flex;
      justify-content: space-between;
      margin: 0 auto var(--spacer-lg);
      padding: var(--spacer-base) var(--spacer-xl);
      @include for-desktop {
        justify-content: flex-start;
        padding: var(--spacer-xs) 0;
        margin: 0 auto;
      }
    }
    &__social-image {
      margin: 0 var(--spacer-2xs) 0 0;
      background-color: #fff;
      border-radius: 100%;
    }
  }
  .sf-footer {
    @include for-desktop {
      border-top: var(--spacer-xs) solid var(--c-primary);
      padding-bottom: 0;
      margin-top: 0;
    }
    &__container {
      margin: var(--spacer-sm);
      @include for-desktop {
        max-width: 69rem;
        margin: 0 auto;
      }
    }
  }
  footer.sf-footer.footer {
      
      border: 0;
  }
  .footer__socials {
      display: flex;
      justify-content: center;
      gap: 41px;
  }
  .footer__social-image{
    background-color: #00000000;
  }
  .sf-footer{
    border-top: 0;
    margin-top: 0;
  }
  .footer__Newsletter {
      display: flex;
      justify-content: center;
      gap: 15px;
      color: #FFF;
      font-family: Roboto;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-top: -30px;
  }
  .email-input{
    background: #0000;
      border: 0;
      border-bottom: 2px solid #FFF;
      color: #C4C4C4;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-family: Roboto;
      font-size: 15px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      width: 244px;
  }
  h5.sf-heading__title.h5 {
      color: #FFF;
      font-family: Roboto;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
  }
  span.sf-menu-item__label {
      color: #FFF;
      font-family: Raleway;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
  }
  </style>