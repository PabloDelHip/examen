<template>
<div class="container">
  <div class="row justify-content-center">
      <div class="col-8 tabla-orders">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Num. Orden</th>
                <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order) in orders" :key="order.id">
                    <td>{{ order.number }}</td>
                    <td>
                      <router-link :to="{ name:'Order', params: {id_order: order.id }}">
                        <button class="btn btn-success"> Ver Orden</button>
                      </router-link>
                      
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
  </div>
</div>
</template>
<script>
import axios from "axios";

export default {

  data () {
    return {
      orders: [],
    
    }
  },
  computed: {
    token(){
      return this.$store.state.token;
    }
  },
  methods: {
     obtenerOrders() {

       axios.get(
        'https://api.ecartapi.com/api/v2/orders',
        {headers: {
            'Authorization': this.token
          }
        }
      )
      .then((response) => {
          this.orders = response.data.orders;
        },
        (error) => {
          var status = error.response.status
          console.log(status);
        }
      );
    }
  },
   created() {
    this.obtenerOrders();
  }
};
</script>
