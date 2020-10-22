<template>
<div class="container">
  <div class="row justify-content-center">
      <div class="col-8 tabla-orders">
        
        <div class="col-12 row  mb-4" >
            <div class="col text-left">
                <router-link :to="{ name:'Orders'}">
                        <button class="btn btn-success"> <i class="fas fa-arrow-left"></i> Volver a las ordenes</button>
                </router-link>
            </div>
            <div class="col row justify-content-end">
                <Form @add-item="addItems"/>
            </div>
        </div>
        <div class="col-12 text-center"  v-if="total === 0">
            <h3>No cuenta con productos la orden</h3>
        </div>
        <table class="table" v-else>
            <thead>
                <tr>
                <th scope="col">Sku</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in items" :key="item.id">
                    <th scope="col">{{ item.sku }}</th>
                    <th scope="col">{{ item.name }}</th>
                    <th scope="col">{{ item.quantity }}</th>
                    <th scope="col">${{ item.price }}</th>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="col-3 contenedor-pagar">
          <div class="col-2 text-center">
                <span>Total: ${{ total.toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) }}</span>
                <br>
                <hr>
                <button type="button" class="btn btn-success  btn-block" @click="realizarPago" :disabled="pagando" > <span><i class="fas fa-redo-alt fa-spin" v-if="pagando"></i></span> Pagar</button>
          </div>
      </div>
  </div>
</div>
</template>
<script>
import Form from './form_add';

import axios from "axios";

export default {
    components: {
        Form,
    },
    data () {
        return {
            items: [],
            total: 0,
            pagando: false,
        
        }
    },
    computed: {
        token() {
        return this.$store.state.token;
        },
        urlApiEnvia() {
            return this.$store.state.url_api_envia;
        },
        id() {
            return this.$route.params.id_order;
        }
    },
    methods: {
        obtenerOrders() {

            //Verificamos si ya existe en el localeStorage los items de la orden
            const LIST_ITEMS = JSON.parse(localStorage.getItem(`items_${this.id}`));
            console.log(LIST_ITEMS);
            if(LIST_ITEMS) 
            {
               LIST_ITEMS.forEach(element => {
                    this.items.push({
                        sku: element.sku,
                        name: element.name,
                        quantity: element.quantity,
                        price: element.price
                    });
                    
                    this.total += (element.quantity * element.price);
                });
                console.log("si hay aqui");
            }
            else 
            {
                axios.get(
                    `${this.urlApiEnvia}/orders/${this.id}`,
                    {
                        headers: {
                            'Authorization': this.token
                        }
                    }
                )
                .then((response) => {
                    localStorage.setItem(`items_${this.id}`, JSON.stringify(response.data.order.items))
                    let list_items = JSON.parse(localStorage.getItem(`items_${this.id}`));

                    list_items.forEach(element => {
                        this.items.push({
                            sku: element.sku,
                            name: element.name,
                            quantity: element.quantity,
                            price: element.price
                        });
                        this.total += (element.quantity * element.price);
                    });
                    console.log(this.items);
                },
                (error) => {
                    var status = error.response.status
                    console.log(status);
                }
                );    
            }
            
        },
        addItems(items)
        {
            this.items.push({
                            sku: items.sku,
                            name: items.name,
                            quantity: items.quantity,
                            price: items.price
                        });
            this.total += (items.quantity * items.price);
            localStorage.setItem(`items_${this.id}`, JSON.stringify(this.items));
            location.reload(true);
        },
        realizarPago()
        {
           if(this.total > 0)
           {
                this.pagando= true;
                setTimeout(() => {
                    this.pagando= false;
                    this.$swal.fire({
                    icon: 'success',
                    title: 'Bien',
                    text: 'Pago echo de forma correcta',
                    confirmButtonText: 'Continuar.'})
                    .then(() => {
                        this.$router.push({ path: '/' })
                    });
                }, 2000);
           }
           else
           {
               alert("No cuenta con productos")
           }
            
        },
        alertaPagado()
        {
            
        }

    },
    created() {
        console.log(`${this.urlApiEnvia}/orders/${this.id}`);
        this.obtenerOrders();
    }
    };
</script>
