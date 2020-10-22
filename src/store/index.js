import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOclVBVkhzZmpUSlVFME5hY2dBN21WU29na2ZUdVdUVyIsImlhdCI6MTU4MDIyODEzNTU4OH0.EHpnkcSTVgkWjnmz4ULfvJTElxKs3ZkHz5lTquSkQsLe77NPZNPY8WyrbIKycrtOBPxmt8YRpGVuAAIcLZ8XDQ',
        url_api_envia: 'https://api.ecartapi.com/api/v2',
    },
    mutations: {},
    actions: {},
    modules: {}
})