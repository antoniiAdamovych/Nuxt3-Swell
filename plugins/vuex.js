import { createStore } from "vuex";
import { ref } from 'vue';
import swell from 'swell-js'

swell.init('autos', 'pk_4fiDORAqYgrTwTPXsYWwMZ30c7ZBlJE2');

const store = createStore({
  async state() {
    return {
      cart: 1,
    };
  },
  mutations: {
    cart(state, cart) {
      state.cart = cart;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});