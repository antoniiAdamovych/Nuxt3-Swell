<template>
    <header>
        <div class="container">
            <NuxtLink to="/"><img src="/img/logo.png" alt=""></NuxtLink>
            <div class="links">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/products">Products</NuxtLink>
                <NuxtLink to="/checkout">Checkout</NuxtLink>
                <a @click="addActive()" class="cartIcon"><img src="/img/cart.png" alt=""><span v-if="sharedString > 0">{{
                    sharedString
                }}</span></a>
            </div>
        </div>
    </header>
    <!-- Einkaufstasche  -->
    <div :class="{ 'hide': !isActive, 'cart': true }">
        <div @click="removeClass()" class="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
                <path
                    d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
            </svg>
        </div>
        <h4>Einkaufstasche</h4>
        <div class="productsCart">
            <!-- for() für das Objekt mit Produkten -->
            <Products v-if="products[0]" v-for="(item, index) in products" :products="products" :item="item" :index="index"
                :key="index"></Products>
            <!-- Loading Animation -->
            <template v-else-if="sharedString > 0">
                <Loading></Loading>
            </template>
            <template v-else-if="sharedString == 0">
                Ihre Einkaufstache ist leer.
            </template>
        </div>
        <div class="checkout">
            <a v-if="$store.state.cart" :href="$store.state.cart.checkout_url">Checkout</a>
        </div>
    </div>
</template>

<script>

import { computed } from 'vue'
import { sharedString, setSharedString } from '~/composables/cart.js'
import swell from 'swell-js'
import Loading from '~/components/LoadingSvg'
import Products from '~/components/ProductsCart'

export default {
    components: {
        Loading,
        Products
    },
    async setup() {
        // Verbindung mit dem E-Commerce System
        swell.init("autos", "pk_4fiDORAqYgrTwTPXsYWwMZ30c7ZBlJE2");

        // Compasable Value
        const string = computed(() => sharedString.value);
        return {
            sharedString: string
        };
    },
    data() {
        return {
            isActive: false,
            products: {}
        };
    },
    methods: {
        // Aktivation der Einkaufstasche
        async addActive() {
            this.isActive = !this.isActive;
            this.$store.commit("cart", await swell.cart.get());
            this.UpdateCart()
        },
        // Objekt mit Cart Dateien, um dynamische Änderung zu erschafen
        UpdateCart() {
            for (let item in this.$store.state.cart.items) {
                let id = this.$store.state.cart.items[item].id;
                let quan = this.$store.state.cart.items[item].quantity;
                let price = this.$store.state.cart.items[item].price;
                let name = this.$store.state.cart.items[item].product.name;
                let img = this.$store.state.cart.items[item].product.images[0].file.url;
                let options = "";
                if (this.$store.state.cart.items[item].variant) {
                    options = this.$store.state.cart.items[item].options;
                }
                let it = {
                    "id": id,
                    "quan": quan,
                    "price": price,
                    "name": name,
                    "img": img,
                    "options": options
                };
                this.products[item] = it;
            }
        },
        // Deaktivation der Einkaufstasche
        removeClass() {
            this.isActive = !this.isActive;
        },
    },
    async created() {
        // eine Eigenschaft setzen
        const n = await swell.cart.get().then((data) => {
            if (data) {
                try {
                    this.$store.commit("cart", data);
                    setSharedString(data.item_quantity);
                }
                catch (er) {
                    console.error(er);
                }
            }
        });
    }
}
</script>