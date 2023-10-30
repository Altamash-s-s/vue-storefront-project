<template>
    <div>
        <div class="video-element">
            <div class="parallax-section snap">
                <div class="parallax-content">
                    <div class="head-text">
                        <!-- <h6 class="para">EYEWEAR</h6> -->
                        <h2 class="text-hd"> One Linear</h2>
                        <a href="#" class="section_btn" @click="openFullScreenVideo">
                            <div class="">
                                <p>See The Film</p>
                            </div>
                        </a>


                    </div>

                    <div id="audio-control" class="muted">
                        <img src="../static/homepage/unmute.png" class="mute_icon">
                        <img src="../static/homepage/mute.png" class="unmute_icon">
                    </div>

                    <div class="video-control">
                        <span class="video-control-play">
                            <span class="video-control-symbol" aria-hidden="true"><img class="play-img"
                                    src="../static/homepage/play-1.png"></span>
                        </span>
                        <span class="video-control-pause">
                            <span class="video-control-symbol" aria-hidden="true"><img class="pause-img"
                                    src="../static/homepage/pause-1.png"></span>
                        </span>
                    </div>

                </div>
                <div class="parallax-image section5">
                    <!-- <video src="../static/homepage/home-video.mp4" playsinline autoplay muted loop></video> -->
                    <video id="banner_video" autoplay muted loop>
                        <source src="../static/homepage/home-video.mp4" type="video/mp4" />
                    </video>

                </div>

            </div>

            <div class="description-container">
                <p class="dscrpt-txt">In publishing and graphic design, &amp;Lorem ipsum is a placeholder text commonly used to
                    demonstrate <br> The visual form of a document or a typeface without relying on meaningful content. <br>Lorem
                    ipsum may be used as a placeholder before final copy is available</p>
            </div>
        </div>





        <div class="collection-section">
            <collection></collection>
        </div>




        <!-- change img on scroll html code and here  -->


    </div>
</template>
  
<script lang="ts" type="module">
import { onMounted, ref, useContext } from '@nuxtjs/composition-api';
import collection from './collection.vue'
import { CmsPage } from '~/modules/GraphQL/types';
import { useContent } from '~/composables';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import $ from 'jquery';
export default {
    name: 'collection-page',
    components: {
        collection,
    },

    data() {
        return {
            imageClasses: ['img-1', 'img-2', 'img-3'],
        };
    },

    methods: {
    openFullScreenVideo() {
        const videoElement = document.getElementById("banner_video");

        if (videoElement) {
            if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
            }
        }
    },
},


    setup() {
        const { addTags } = useCache();
        const { loadPage } = useContent();
        const { app } = useContext();
        const page = ref<CmsPage | null>(null);

        onMounted(() => {
            (function () {




            }).call(this);

            $(document).ready(function () {

                const items = $('.bg_sec');
                let currentItemIndex = 0;

                // Function to remove the active class from all items
                function removeActiveClass() {
                    items.removeClass('active');
                }

                // Function to add the active class to the current item
                function setActiveClass() {
                    items.eq(currentItemIndex).addClass('active');
                }

                // Initial set active class
                setActiveClass();

                // Mouse wheel scroll event listener
                $('.dv3_inner').on('mousewheel', function (e) {
                    // Check if the user scrolled up or down
                    if (e.originalEvent.deltaY > 0) {
                        // Scrolled down
                        console.log('going down');
                        if (currentItemIndex < items.length - 1) {
                            currentItemIndex++;
                            removeActiveClass();
                            setActiveClass();
                        }
                    } else {
                        // Scrolled up
                        if (currentItemIndex > 0) {
                            currentItemIndex--;
                            removeActiveClass();
                            setActiveClass();
                        }
                    }
                });

                $('#audio-control').click(function () {
                    if ($("#banner_video").prop('muted')) {
                        $("#banner_video").prop('muted', false);
                        $('.mute_icon').show();
                        $('.unmute_icon').hide();

                    } else {
                        $("#banner_video").prop('muted', true);
                        $('.mute_icon').hide();
                        $('.unmute_icon').show();
                    }
                });

                const videoElement = document.querySelector('#banner_video') as HTMLVideoElement;
                const playPauseButton = document.querySelector('.video-control') as HTMLButtonElement;

                playPauseButton.addEventListener('click', () => {
                    playPauseButton.classList.toggle('playing');
                    if (playPauseButton.classList.contains('playing')) {
                        videoElement.pause();
                    }
                    else {
                        videoElement.play();
                    }
                });

                videoElement.addEventListener('ended', () => {
                    playPauseButton.classList.remove('playing');
                });

                window.addEventListener('load', videoScroll);
                window.addEventListener('scroll', videoScroll);

                function videoScroll() {
                    var videoElements = document.querySelectorAll('#banner_video[autoplay]');

                    if (videoElements.length > 0) {
                        var windowHeight = window.innerHeight;

                        videoElements.forEach(function (thisVideoEl) {
                            var videoElement = thisVideoEl as HTMLVideoElement;
                            var videoHeight = videoElement.clientHeight;
                            var videoClientRect = videoElement.getBoundingClientRect().top;

                            if (videoClientRect <= (windowHeight - videoHeight * 0.10) && videoClientRect >= -videoHeight * 0.10) {
                                videoElement.play();
                            } else {
                                videoElement.pause();
                            }
                        });
                    }
                }


            });






        });


        


        //     const imageClasses = ref(['img-1', 'img-2', 'img-3']);

        // // Function to handle image class changes on scroll
        // const changeImage = () => {
        //   const scroll = window.scrollY + window.innerHeight / 3;

        //   imageClasses.value.forEach((imageClass, index) => {
        //     const el = document.querySelector(`.${imageClass}`) as HTMLElement;

        //     if (!el) return;

        //     el.classList.remove('active');

        //     if (el instanceof HTMLElement) {
        //       if (el.offsetTop <= scroll && el.offsetHeight + el.offsetTop > scroll) {
        //         el.classList.add('active');
        //       }
        //     }
        //   });
        // };

        // onMounted(() => {
        //   window.addEventListener('scroll', changeImage);
        //   changeImage(); // Call it initially to set the initial state.
        // });

        // onBeforeUnmount(() => {
        //   window.removeEventListener('scroll', changeImage);
        // });
        //     return {
        //   imageClasses,
        // };


    },




};
</script>
  


<style scoped>
.mute_icon {
    display: none;
}

.video-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.video-abs {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

img.play-img {
    width: 50px;
    position: absolute;
    bottom: 4px;
    left: 0px;
    cursor: pointer;
}

img.pause-img {
    width: 50px;
    position: absolute;
    bottom: 4px;
    left: 0px;
    cursor: pointer;
}

button.video-control {
    border: 0;
    background-color: #0000;
}

.video-control.show {
    display: block;
}

img.mute_icon {
    position: absolute;
    right: 25px;
    width: 24px;
    bottom: 15px;
    cursor: pointer;
}

img.unmute_icon {
    position: absolute;
    right: 25px;
    width: 24px;
    bottom: 15px;
    cursor: pointer;
}

.video-control:not(.playing) .video-control-play,
.video-control.playing .video-control-pause {
    display: none;
}

.parallax-section .parallax-content {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    color: #fff;
    font-size: 2rem;
    letter-spacing: 0.1em;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 100%;
    position: relative;
    z-index: 2;
}

.head-text {
    position: absolute !important;
    bottom: 30px;
    left: 40%;
}

h2.text-hd {
    margin-left: 40px;
}

.section_btn {
    background-color: rgba(25, 17, 11, .2);
    border-color: #fff;
    border: 1px solid #FFF;
    backdrop-filter: blur(2px);
    color: #FFF;
    font-weight: 400;
    padding: 16px 22px;
    width: -moz-fit-content;
    width: fit-content;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin: auto;
    margin-top: 22px;
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 8rem;
    cursor: pointer;
    margin-left: 35px;
}

.section_btn:hover {
    background: #00000029;
    color: #FFF;
    border: 1px solid #FFF;
    cursor: pointer;

}

.section_btn div {
    width: 100%;
    float: left;
    display: flex;
    align-items: center;
    position: relative;
}

.section_btn div p {
    margin: 0;
    margin-left: 7px;
    transition: all 0.4s;
}

.parallax-section {
    height: 90vh;
    overflow: visible;
    position: relative;
    margin-top: 75px;

}

.parallax-image {
    position: relative;
}

.video-container {
    position: relative;
    width: 100%;
    height: 100%;
}

video {
    width: 100%;
    /* Ensure the video takes the full width of its container */
    height: 100%;
    /* Ensure the video takes the full height of its container */
    object-fit: cover;
    /* Maintain aspect ratio and cover the entire container */
}

.parallax-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-image: linear-gradient(0deg, rgb(0 0 0 / 82%) 0, transparent);
    transition: opacity .3s cubic-bezier(.39, .575, .565, 1);

}

.parallax-section .parallax-image {
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    height: 100%;
    left: 0;
    opacity: 1.5;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: alpha(opacity=50);
    position: absolute;
    top: 0;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -o-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    width: 100%;
    z-index: 1;
}

.section_btn:hover div p {
    margin-left: -6px;
}

.section_btn div img {
    width: 20px;
    margin-left: 7px;
    display: none;
}

.section_btn div::after {
    content: '';
    background-image: url('../static/icons/chevron-1.svg');
    position: absolute;
    width: 20px;
    height: 20px;
    top: -2px;
    right: -12px;
    background-size: cover;
    opacity: 0;
    transition: all 0.4s;
}

.section_btn:hover div::after {
    opacity: 1;
}


.description-container {
    padding: 9.2% 0 9.2%;
    background-color: #000;
}

p.dscrpt-txt {
    color: #FFF;
    text-align: center;
    font-size: 24px;
    line-height: 34px;
    font-weight: 300;
}

/* .img-1{
    background-image: url('../static/homepage/collection-1.webp')
}
.img-2{
    background-image: url('../static/homepage/collection-2.webp')
}
.img-3{
    background-image: url('../static/homepage/collection-3.webp')
}

.section {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.image-container {
  position: relative;
  display: flex;
}

.image {
  height: 100vh;
  position: fixed;
  width: 100%;
  top: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  mix-blend-mode: multiply;
  
  opacity: 1;
  transition: filter 0.5s ease, fade 0.5s ease;
}

.section.active .image {
  opacity: 1;
  filter: blur(0);
} */
</style>









