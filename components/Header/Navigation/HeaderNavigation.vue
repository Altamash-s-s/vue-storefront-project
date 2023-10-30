<template>
  <div
    class="header-navigation"
    @mouseleave="setCurrentCategory(null)" 
  >
    <div class="sf-header-navigation-item__item sf-header-navigation-item__item--desktop hd_nav_item">
      <img src='../../../static/icons/popup_cancel_btn.png' class="close_menu">
      <div class="nav_inner_dv">
        <HeaderNavigationItem
          v-for="(category, index) in categoryTree"
          :key="index"
          ref="lvl0CatRefs"
          :data-testid="category.uid"
          :label="category.name"
          :link="localePath(getCatLink(category))"
          tabindex="1"
          aria-haspopup="true"
          class="nav-item"
          :data-index="index"
          :has-children="hasChildren(category)"
          @mouseenter.native.prevent="onMouseEnter(category)"
          @keydown.down.native.prevent="setCurrentCategory(category)"
          @keydown.up.native.prevent="setCurrentCategory(null)"
          @keyup.tab.native.prevent="setFocus($event)"
          @keydown.right.native.prevent="navRight()"
          @keydown.left.native.prevent="navLeft()"
        />
        <!-- <a href="/collection-page" class="sf-link sf-header-navigation-item__link nav-item">Static Link</a> -->
      </div>
    </div>
    <HeaderNavigationSubcategories
      v-if="hasChildren(currentCategory)"
      :current-category="currentCategory"
      :has-focus="hasFocus"
      @hideSubcategories="focusRootElementAndHideSubcategories"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent, PropType, ref,
} from '@nuxtjs/composition-api';

import { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';
import type { ComponentTemplateRef } from '~/types/componentTemplateRef';
import HeaderNavigationItem from './HeaderNavigationItem.vue';

export default defineComponent({
  name: 'HeaderNavigation',
  components: {
    HeaderNavigationSubcategories: () => import('~/components/Header/Navigation/HeaderNavigationSubcategories.vue'),
    HeaderNavigationItem,
  },
  props: {
    categoryTree: {
      type: Array as PropType<CategoryTree[]>,
      default: () => [],
    },
  },
  setup() {
    const { getCatLink } = useUiHelpers();

    const currentCategory = ref<CategoryTree | null>(null);
    const lvl0CatRefs = ref<ComponentTemplateRef[]>();
    const hasFocus = ref(false);
    let lvl0CatFocusIdx = 0;
    let focusedElement : HTMLElement | null = null;

    const setCurrentCategory = (category: CategoryTree | null) => {
      currentCategory.value = category;
    };

    const hasChildren = (category: CategoryTree) => Boolean(category?.children?.length);

    const setFocus = (event: MouseEvent & { target: HTMLElement }) => {
      focusedElement = event.target;
      lvl0CatFocusIdx = Number(event.target.dataset.index);
      hasFocus.value = true;
    };

    const focusRootElementAndHideSubcategories = () => {
      setCurrentCategory(null);
      if (focusedElement !== null) focusedElement.focus();
    };

    const navRight = () => {
      lvl0CatFocusIdx++;
      if (lvl0CatRefs.value[lvl0CatFocusIdx]) {
        lvl0CatRefs.value[lvl0CatFocusIdx].$el.focus();
        focusedElement = lvl0CatRefs.value[lvl0CatFocusIdx].$el;
      } else {
        lvl0CatFocusIdx--;
      }
    };

    const navLeft = () => {
      lvl0CatFocusIdx--;
      if (lvl0CatRefs.value[lvl0CatFocusIdx]) {
        lvl0CatRefs.value[lvl0CatFocusIdx].$el.focus();
        focusedElement = lvl0CatRefs.value[lvl0CatFocusIdx].$el;
      } else {
        lvl0CatFocusIdx++;
      }
    };

    const onMouseEnter = (category: CategoryTree) => {
      currentCategory.value = category;
      focusedElement = null;
      hasFocus.value = false;
    };

    return {
      getCatLink,
      setCurrentCategory,
      currentCategory,
      hasChildren,
      setFocus,
      focusRootElementAndHideSubcategories,
      lvl0CatRefs,
      navRight,
      navLeft,
      hasFocus,
      onMouseEnter,
    };
  },
});
</script>
<style lang="scss" scoped>

//-------------------------------- Navbar CSS START Here
.cstm_nav_layout {
    position: fixed;
    left: 0;
    top:0px;
    height: 100%;
    width: 20%;
    background: #fff;
    z-index: 1;
    border-right: 1px solid #0003;
    display: none;
}
.cstm_nav_layout .hd_nav_item {
    display: block !important;
    padding-top: 100px;
}
.cstm_nav_layout .sf-header-navigation-item__item a{

}
//-------------------------------- Navbar CSS END Here

.nav_inner_dv {
    padding: 0 !important;
}
.cstm_nav_layout .hd_nav_item {
  height: 100%;
  align-items: center;
  position: relative;
}
.cstm_nav_layout .hd_nav_item a {
  justify-content: space-between;
  margin: 0;
  padding: 0 20px;
  margin-bottom: 35px;
  text-transform: initial;
  font-size: 19px;
}
img.close_menu {
  position: absolute;
  top: 20px;
  left: 46px;
  filter: invert(1);
  width: 20px;
  padding: 0 !important;
  cursor: pointer;
}
.header-navigation {
  &__main {
    display: flex;
  }
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-sm);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}
</style>