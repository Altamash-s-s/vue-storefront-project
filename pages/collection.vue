<template>
  <div class="dv3">
    <div class="dv3_inner">
      <div class="bg bg1 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg2 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>

        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg3 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg4 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg5 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg6 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
      <div class="bg bg7 bg_sec">
        <h1 class="collection-hd">Human Abstract</h1>
        <a href="http://localhost:3000/default/one-linear.html" class="section_btn">
          <div class="">
            <p>See All The Look</p>
          </div>
        </a>
        <img src="../static/homepage/collection-1.webp" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" type="module">
export default {

};
</script>
<style>
body {
  margin: 0;
}

.img-1 {
  background-image: url('../static/homepage/collection-1.webp')
}

.img-2 {
  background-image: url('../static/homepage/collection-2.webp')
}

.img-3 {
  background-image: url('../static/homepage/collection-3.webp')
}

.img-4 {
  background-image: url('../static/homepage/collection-4.webp')
}

.img-5 {
  background-image: url('../static/homepage/collection-5.webp')
}

.img-6 {
  background-image: url('../static/homepage/collection-6.webp')
}

.img-7 {
  background-image: url('../static/homepage/collection-7.webp')
}

.img-8 {
  background-image: url('../static/homepage/collection-7.webp')
}

.dv3 {

  width: 100%;
  min-height: 180vh;
  position: relative;
}

.dv3_inner {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;

}

.bg {
  width: 100%;
  height: 100%;
  position: relative;
}

.bg:not(:first-child) {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s linear;
}

.bg.active {
  opacity: 1;
}

.bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

h1.collection-hd {
  position: absolute;
  top: 45%;
  left: 90px;
  color: #FFFF;
  font-size: 67px;
}

.section_btn {
  background-color: #FFF;
  border-color: #fff;
  border: 1px solid #FFF;
  backdrop-filter: blur(2px);
  color: #000;
  font-weight: 400;
  padding: 16px 30px;
  width: -moz-fit-content;
  width: fit-content;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin: auto;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 10rem;
  position: absolute;
  top: 57%;
  left: 16%;
}

.section_btn:hover {
  background: #00000029;
  color: #FFF;
  border: 1px solid #FFF;

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
</style>