import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            current_lj: null,
        }
    },
    mutations: {
        setCurrentLJ(state, lj_object) {
            state.current_lj = lj_object
        }
    }   
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')