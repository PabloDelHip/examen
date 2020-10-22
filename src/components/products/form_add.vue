<template>
    <div>
        <!-- Button trigger modal -->

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Agregar Producto
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ValidationObserver  ref="observer">
                    <form>
                        <div class="form-group">
                            <label >SKU <span>*</span></label>
                            <ValidationProvider name="Sku" rules="required" v-slot="{ errors }">
                                <input type="text" v-model="items.sku" class="form-control" aria-describedby="skuHelp">
                                <span :class="['error', 'invalid-feedback', errors[0] ? 'ver' : '']">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <small id="skuHelp" class="form-text text-muted">El número/código de referencia o simplemente referencia del producto.</small>
                        </div>
                        <div class="form-group">
                            <label> Nombre <span>*</span></label>
                            <ValidationProvider name="Nombre" rules="required" v-slot="{ errors }">
                                <input type="text" v-model="items.name" class="form-control" aria-describedby="nameHelp">
                                <span :class="['error', 'invalid-feedback', errors[0] ? 'ver' : '']">{{ errors[0] }}</span>
                            </ValidationProvider>
                                <small id="nameHelp" class="form-text text-muted">Nombre del producto.</small>
                        </div>
                        <div class="form-group">
                            <label >Cantidad*</label>
                            <ValidationProvider name="Cantidad" rules="required|numeric" v-slot="{ errors }">
                                <input type="text" v-model="items.quantity" class="form-control" aria-describedby="cantidadHelp">
                                <span :class="['error', 'invalid-feedback', errors[0] ? 'ver' : '']">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <small id="cantidadHelp" class="form-text text-muted">Cantidad de productos.</small>
                        </div>
                        <div class="form-group">
                            <label >Precio*</label>
                            <ValidationProvider name="Precio" rules="required|decimal" v-slot="{ errors }">
                                <input type="text" v-model="items.price" class="form-control"  aria-describedby="precioHelp">
                                <span :class="['error', 'invalid-feedback', errors[0] ? 'ver' : '']">{{ errors[0] }}</span>
                            </ValidationProvider>
                            <small id="precioHelp" class="form-text text-muted">Precio por unidad de productos.</small>
                        </div>
                    </form>
                    </ValidationObserver>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" @click="addItem()">Agregar</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';
    
export default {
    components: {

        ValidationObserver,
        ValidationProvider,
    },
    data () {
        return {
            items: {
                sku:'',
                name: '',
                quantity: '',
                price: ''
            },
        
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
        async addItem() {
            const isValid = await this.$refs.observer.validate();
            if (!isValid) {
                    alert("Verifique que el formulario fue llenado de forma correcta");  
            }
            else
            {
                this.$emit('add-item', this.items);   
            }
            
        },
    },
};
</script>

<style>

.ver{
    display: block !important;
}
</style>
