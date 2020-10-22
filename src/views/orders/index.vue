<template>
    <section>
        <Tabla />
        <!-- <h1 style="z-index: 99999 !important; width: 500px; height:100px;">{{browser}}</h1> -->
    </section>
</template>

<script>
import Tabla from '../../components/orders/tabla';
export default {
  name: 'Orders',
  components: {
    Tabla,
  },
};
</script>
