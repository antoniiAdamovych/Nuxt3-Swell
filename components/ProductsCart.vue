<template>
    <div v-if="item.quan > 0" class="prod">
        <img :src="item.img" :alt="item.name">
        <div class="infos">
            <h5>{{ item.name }}</h5>
            <div class="options">
                <template v-if="item.options" v-for="option in item.options">
                    <div>
                        {{ option.value }}
                    </div>
                </template>
            </div>
            <p v-if="products[index]">{{ products[index].price * products[index].quan }}€‎</p>
            <div class="quantitity">
                <button @click="removeQuantity(item.id, item.quan, index)">-</button>
                <p v-if="products[index]">{{ products[index].quan }}</p>
                <button @click="addQuantity(item.id, item.quan, index)">+</button>
            </div>
        </div>
        <div @click="removeItem(item.id, index)" class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 110.61 122.88">
                <title>trash</title>
                <path
                    d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
            </svg>
        </div>
    </div>
</template>

<script>

import swell from 'swell-js'

export default {
    async setup() {
        swell.init("autos", "pk_4fiDORAqYgrTwTPXsYWwMZ30c7ZBlJE2");
    },
    props: {
        item: Object,
        index: String,
        products: Object
    },
    methods: {
        // +
        async addQuantity(id, quantity, index) {
            this.products[index].quan++;
            this.CartCounter();
            quantity += 1;
            await swell.cart.updateItem(id, {
                quantity: quantity
            });
        },
        // Änderung der Compasable Value
        CartCounter() {
            let totalCount = 0;
            for (let item in this.products) {
                totalCount += this.products[item].quan;
            }
            setSharedString(totalCount);
        },

        // ein Produkt abschafen
        async removeItem(id, index) {
            this.products[index].quan = 0;
            await swell.cart.removeItem(id);
            this.CartCounter();
        },
        // -
        async removeQuantity(id, quantity, index) {
            if (quantity == 1) {
                this.products[index].quan--;
                await swell.cart.removeItem(id);
            }
            else if (quantity > 1) {
                quantity -= 1;
                this.products[index].quan--;
                await swell.cart.updateItem(id, {
                    quantity: quantity
                });
            }
            this.CartCounter();
        },
    }
}

</script>