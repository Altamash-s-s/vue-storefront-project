<template>
  <SfBottomModal :is-open="isModalOpen" class="currency-hd" :title="$t('Choose Currency')" @click:close="closeModal">
    <SfList v-if="availableCurrencies.length > 1">
      <SfListItem v-for="currency in availableCurrencies" :key="currency">
        <a
          href="/"
          :class="selectedCurrency === currency ? 'container__currency--selected-label' : ''"
          @click.prevent="changeCurrency({ id: currency })"
        >
          <SfCharacteristic class="currency">
            <template #title>
              <!-- Use the WebP image directly in the src attribute -->
              <img class="flag-img" :src="getCurrencyFlagIcon(currency)" alt="Flag" />
              <span>{{ currency }}</span>
            </template>
          </SfCharacteristic>
        </a>
      </SfListItem>
    </SfList>
    <template #close-mobile>
      <SfButton class="sf-button--full-width sf-bottom-modal__cancel" aria-label="Close" @click="closeModal">
        {{ $t('Cancel') }}
      </SfButton>
    </template>
  </SfBottomModal>
</template>


<script>
import {
  defineComponent,
  computed,
  onMounted
} from '@nuxtjs/composition-api';
import {
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import {
  useCurrency
} from '~/composables';

// Import the currency flag icons
import usdFlag from '../../static/icons/langs/en_US.webp';
import inrFlag from '../../static/icons/langs/IN-flag.webp';
// Import other currency flags as needed

// Import other currency flags as needed

export default defineComponent({
  name: 'CurrenciesModal',
  components: {
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },
  props: {
    isModalOpen: Boolean,
    selectedCurrency: {
      type: String,
      default: ''
    }
  },
  emits: ['closeModal'],
  setup() {
    const {
      currency: currencies,
      change: changeCurrency,
      load: loadCurrencies
    } = useCurrency();

    const availableCurrencies = computed(() => currencies.value?.available_currency_codes || []);

    onMounted(() => {
      if (currencies.value && currencies.value?.available_currency_codes) return;
      loadCurrencies();
    });

    const getCurrencyFlagIcon = (currency) => {
      switch (currency) {
        case 'USD':
          return usdFlag;
        case 'INR':
          return inrFlag;
        // Add cases for other currencies as needed
        default:
          return '';
      }
    };

    return {
      changeCurrency,
      availableCurrencies,
      getCurrencyFlagIcon
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
});
</script>

<style lang="scss" >
.sf-bottom-modal {
  z-index: 2;
  left: 0;
  @include for-desktop {
    --bottom-modal-height: 100vh;
  }
}
.sf-bottom-modal::v-deep .sf-bottom-modal__close {
  position: var(--circle-icon-position, absolute);
  top: var(--spacer-xs);
  right: var(--spacer-xs);
}

.sf-list {
  .language {
    padding: var(--spacer-sm);

    &__flag {
      margin-right: var(--spacer-sm);
    }
  }

  @include for-desktop {
    display: flex;
    justify-content: center;
  }
}

.container__currency {
  &--selected-label {
    font-weight: bold;
  }

  &:hover,
  &--selected {
    opacity: 1;
  }
}
.sf-characteristic__text {
    font-size: 35px;
}
.sf-bottom-modal__container {
    width: 24%;
    height: auto;
    position: fixed;
    top: 68px;
    right: 0;
}
.flag-img {
    width: 80%;
}
.sf-bottom-modal__overlay.sf-overlay {
    position: relative;
}
.currency-hd{
  font-size: 25px;
}
</style>
