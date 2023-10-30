<template>
  <div
    class="product__fit-swatch"
    :class="{ 'product__fit-swatch--selected': selected }"
    @click="handleClick"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    selected: Boolean,
  },
  methods: {
    handleClick() {
      if (!this.selected) {
        this.$emit('input', this.value);
      }
    },
  },
};
</script>

<style scoped>
.product__fit-swatch {
  display: inline-block;
  padding: 18px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
  font-family: 'Raleway';
}

.product__fit-swatch--selected {
  background-color: #000; 
  color: #fff; 
}

</style>
