<template>
  <div id="app">
    <div class="container mt-5">
      <div class="row justify-content-between align-items-center titulo-customer pl-5 pr-5">
        <div class="col-3 text-righ">
          <i class="fas fa-shopping-basket"></i>
          <span class="ml-3">Orders</span>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition> 
  </div>
</template>

<style >
  /* Transicion de VUE */

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
  @import "../public/style.css";
  @import "../node_modules/bootstrap/dist/css/bootstrap.css";
</style>