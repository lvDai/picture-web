<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {font-family: 'iconfont';
    src: url('./assets/fontIcon/iconfont.eot');
    src: url('./assets/fontIcon/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/fontIcon/iconfont.woff') format('woff'),
    url('./assets/fontIcon/iconfont.ttf') format('truetype'),
    url('./assets/fontIcon/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.W1200{
  width:1200px;
  margin:0 auto;
}
</style>
