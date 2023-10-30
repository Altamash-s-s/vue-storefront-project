<template>
    <div>
        <div class="dv3">
        <div class="dv3_inner" id="dv3_inner">
                <VueSlickCarousel v-bind="settings" class="slick_slider_collection" ref="slick" @afterChange="sliderAfterChange">
                    <div class="bg bg1 bg_sec">
                        <img src="../static/homepage/collection-1.webp" />
                    </div>
                    <div class="bg bg2 bg_sec">
                        <img src="../static/homepage/collection-2.webp" />
                    </div>
                    <div class="bg bg3 bg_sec">
                        <img src="../static/homepage/collection-3.webp" />
                    </div>
                    <div class="bg bg4 bg_sec">
                        <img src="../static/homepage/collection-4.webp" />
                    </div>
                    <div class="bg bg5 bg_sec">
                        <img src="../static/homepage/collection-5.webp" />
                    </div>
                    <div class="bg bg6 bg_sec">
                        <img src="../static/homepage/collection-6.webp" />
                    </div>
                    <div class="bg bg7 bg_sec">
                        <img src="../static/homepage/collection-7.webp" />
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
    </div>
  </template>

  <script lang="ts" type="module">
  import $ from 'jquery';

  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


  export default {
    name: 'slick_collection',
    components: { VueSlickCarousel },
    
    data() {
      return {
        settings: {
          arrows: true,
          dots: true,
          fade:true,
          draggable: true,
          swipe:true,
          vertical:true,
          infinite:false,
        },
      }
    },

    methods: {
        sliderAfterChange(slide) {
            // You can access the current slide index here
            console.log('Current slide index:', slide);
        },

        handleMouseWheel(event) {
            // Handle the mouse wheel event to change the slider
            const slick = this.$refs.slick;
            if (event.deltaY > 0) {
                slick.next();
            } else {
                slick.prev();
            }
        },
    },
    mounted() {
        // Add the mouse wheel event listener to the slick slider
        this.$refs.slick.$el.addEventListener('wheel', this.handleMouseWheel);
    },
    beforeDestroy() {
        // Remove the mouse wheel event listener when the component is destroyed
        this.$refs.slick.$el.removeEventListener('wheel', this.handleMouseWheel);
    },
  

  };
  </script>
  <style>
    /* .slick_slider_collection .slick-prev {
        left: 0;
        z-index: 1;
    }
    .slick_slider_collection .slick-next {
        right: 0;
    } */
    .slick_slider_collection , .slick_slider_collection .slick-list{
        height: 100% !important;
    }
    .slick_slider_collection , .slick_slider_collection .slick-list .slick-slide {
        border: none !important;
    }
    .dv3 {
        width:100%;
        min-height: 200vh;
        position: relative;
    }
    .dv3_inner {
        position: sticky;
        top: 0;
        width: 100%;
        height:100vh;
    }
/*   
    .bg {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        transition: opacity .3s linear;
    }
    .bg.active{
        opacity: 1;
    }
    .bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
    } */
  </style>