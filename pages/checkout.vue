<template>
    <div v-if="payLoad" class="payLoad">
        <LoadingSvg />
    </div>
    <section class="checkoutSection">
        <div class="container">
            <div class="shippinfos">
                <form v-on:submit="GetFromData">
                    <div class="name">
                        <label for="">Vorname<input required type="text" name="name"></label>
                        <label for="">Nachname<input required type="text" name="lastname"></label>
                    </div>
                    <label for="">Telefonnummer<input type="tel" name="phone"></label>
                    <label for="">E-Mail<input required type="email" name="email"></label>
                    <h2>Ihre Adresse</h2>
                    <label for="">ADRESSE. BITTE HIER ANGEBEN: STRASSE UND HAUSNUMMER *<input required type="text"
                            name="adress1"></label>
                    <label for="">ADRESSE<input type="text" name="adress2"></label>
                    <label for="">PLZ *<input required type="text" name="zip"></label>
                    <label for="">LANDKREIS *<input required type="text" name="state"></label>
                    <label for="">STADT *<input required type="text" name="city"></label>
                    <div class="cartCart">
                        <h2>Pay</h2>
                        <label for="">Kartenummer<input required v-on:input="Cart" min="16" max="16" name="cartn"
                                type="text"></label>
                        <div class="name">
                            <label for="">Datum
                                <div class="name">
                                    <select name="month">
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <select name="year">
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                            </label>
                            <label for="">CVV <input required v-on:input="Cart" type="password" min="3" max="3"
                                    name="cvv"></label>
                        </div>
                    </div>
                    <button>Pay</button>
                </form>
            </div>
            <div class="cartProducts">
                <h2>Produkte</h2>
                <div class="cartProd">
                    <template v-if="products" v-for="(item, index) in products">
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
                                <p>{{ products[index].price * products[index].quan }}€‎</p>
                                <div class="quantitity">
                                    <button @click="removeQuantity(item.id, item.quan, index)">-</button>
                                    <p>{{ products[index].quan }}</p>
                                    <button @click="addQuantity(item.id, item.quan, index)">+</button>
                                </div>
                            </div>
                            <div @click="removeItem(item.id, index)" class="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                    viewBox="0 0 110.61 122.88">
                                    <title>trash</title>
                                    <path
                                        d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
                                </svg>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import swell from 'swell-js'
import { useRoute } from 'vue-router'

export default {
    async setup() {
        swell.init("autos", "pk_4fiDORAqYgrTwTPXsYWwMZ30c7ZBlJE2");
    },
    data() {
        return {
            form: null,
            products: {},
            cart: null,
            payLoad: false
        }
    },

    methods: {
        GetFromData(event) {
            event.preventDefault();

            const data = new FormData(event.target);
            this.form = Object.fromEntries(data.entries())
            this.Payment()
        },
        Cart(event) {
            event.preventDefault();
            const val = event.target.value
            const ar = val.split('')

            let newVal = ''
            ar.map(le => {
                if (isNaN(le)) {
                    ar.pop()
                }
            })
            ar.map(le => {
                newVal += le
            })

            if (event.target.attributes.name.nodeValue === 'cartn') {
                if (ar.length > 19) {
                    let v = newVal.split('')
                    v.pop()
                    newVal = ''
                    v.map(item => {
                        newVal += item
                    })
                } else {
                    if (ar.length === 4 || ar.length === 9 || ar.length === 14) {
                        newVal += ' '
                    } else if (ar.length === 5 || ar.length === 10 || ar.length === 15) {
                        let v = newVal.split('')
                        v.pop()
                        newVal = ''
                        v.map(item => {
                            newVal += item
                        })
                    }
                }
            } else if (event.target.attributes.name.nodeValue === 'cvv') {
                if (ar.length > 3) {
                    let v = newVal.split('')
                    v.pop()
                    newVal = ''
                    v.map(item => {
                        newVal += item
                    })
                }
            }
            event.target.value = newVal
            // console.log(ar)
        },
        async setCart() {
            const cart = await swell.cart.get()
            if (cart) {
                for (let item in cart.items) {
                    let id = cart.items[item].id;
                    let quan = cart.items[item].quantity;
                    let price = cart.items[item].price;
                    let name = cart.items[item].product.name;
                    let img = cart.items[item].product.images[0].file.url;
                    let options = "";
                    if (cart.items[item].variant) {
                        options = cart.items[item].options;
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
            }
        },
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

        async Payment() {
            this.payLoad = true
            if (swell.card.validateNumber(this.form.cartn) && swell.card.validateCVC(this.form.cvv)) {
                const response = await swell.card.createToken({
                    number: this.form.cartn,
                    exp_month: this.form.month,
                    exp_year: this.form.year,
                    cvc: this.form.cvv,
                    billing: {
                        address1: this.form.address1,
                        address2: this.form.address2,
                        city: this.form.city,
                        state: this.form.state,
                        zip: this.form.zip,
                        country: 'DE', // Two letter ISO country code
                    }
                })

                await swell.cart.update({
                    billing: {
                        card: response
                    },
                    account: {
                        email: this.form.email,
                    },
                    shipping: {
                        name: `${this.form.name} ${this.form.lastname}`,
                        address1: this.form.adress1,
                        address2: this.form.adress2,
                        city: this.form.city,
                        state: this.form.state,
                        zip: this.form.zip,
                        country: 'DE', // Two letter ISO country code
                        phone: this.form.phone
                    }
                })

                const responce = await swell.cart.submitOrder()
                    .then((response) => {
                        if (response.paid) {
                            // Payment was successful
                            console.log("Payment successful!");
                            // You can access additional information if needed, such as order ID or transaction ID
                            var orderId = response.id;
                            // const route = useRoute()
                            navigateTo(`/danke/${orderId}`, { redirectCode: 301 })
                        } else {
                            // Payment failed
                            console.log("Payment failed!");
                            // You can access the error message for more details on the failure
                            var errorMessage = response.error_message;
                        }
                    })
                    .catch(function (error) {
                        // Handle any errors that occur during the API call
                        console.error("An error occurred:", error);
                    });
                setSharedString(0)
            } else {
                alert('Ungultige Karte')
            }
        }
    },

    async created() {

        this.setCart()
    }
}

</script>