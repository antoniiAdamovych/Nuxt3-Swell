<template>
  <Head>
    <Title>
      Test
    </Title>
    <Meta name="twitter:image" content="https://images.unsplash.com/photo-1608541737042-87a12275d313?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
    <Meta name="twitter:description" content="test" />
  </Head>
  <section class="product">
    <div class="container">
      <div v-if="data" class="content">
        <div v-if="images" class="imgs">
          <template v-if="Object.keys(images).length > 1" v-for="(img, index) in images">
            <img @click="imgClick(img.id)" :class="{ 'bactive': img.status }" :src="img.url" alt="">
            <template v-if="img.status">
              <button @click="backSl(index)" class="back">&lt;</button>
              <button @click="NextSl(index)" class="next">></button>
              <img @click="imgClick(img.id)" class="active" :src="img.url" alt="">
            </template>
          </template>
          <img v-else :src="images[0].url" class="active" alt="">
        </div>
        <div class="wrap">
          <div class="infos">
            <h1>{{ data.name }}</h1>
            <p v-html="data.description"></p>
            <h3 class="price">
              {{ data.price }}€
            </h3>
            <div v-for="gr in data.options" class="variants">
              <h5>{{ gr.name }}</h5>
              <div>
                <button :class="{ 'active': variant[`${gr.name}`] == variable.name, 'notchecked': notChecked }"
                  @click="SetVariable(gr.name, variable.name)" v-for="variable in gr.values">
                  {{ variable.name }}</button>
              </div>
            </div>
            <div class="count">
              <button @click="minusCount()">-</button>
              <p>{{ quan }}</p>
              <button @click="addCount()">+</button>
            </div>
          </div>
          <button @click="addToCart()" class="addToCart">
            Hinzufügen
          </button>
        </div>
      </div>
      <div class="load" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px"
          height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="rotate(0 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(30 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(60 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(90 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(120 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(150 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(180 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(210 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(240 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(270 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(300 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s"
                repeatCount="indefinite" />
            </rect>
          </g>
          <g transform="rotate(330 50 50)">
            <rect x="48.5" y="17.5" rx="0.65" ry="0.65" width="3" height="5" fill="#19501e">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
            </rect>
          </g>
          <!-- [ldio] generated by https://loading.io/ -->
        </svg>
      </div>
    </div>
  </section>
</template>
  
<script>
import { useRoute } from 'vue-router'
import swell from 'swell-js'
import { updateSharedString } from '@/composables/cart.js'

export default {
  async setup() {
    const route = useRoute()
    const slug = route.params._id
    swell.init('autos', 'pk_4fiDORAqYgrTwTPXsYWwMZ30c7ZBlJE2');
    const data = await swell.products.get(slug);
    return {
      data: data
    }
  },
  data() {
    return {
      variant: {},
      quan: 1,
      notChecked: false,
      images: {}
    }
  },
  async created() {
    for (let img in this.data.images) {
      let obj = {}
      if (img == 0) {
        obj = {
          'id': this.data.images[img].id,
          'url': this.data.images[img].file.url,
          'status': true
        }
      } else if (img > 0) {
        obj = {
          'id': this.data.images[img].id,
          'url': this.data.images[img].file.url,
          'status': false
        }
      }
      this.images[img] = obj
    }
    const AsArray = Object.entries(this.images);
    const a = AsArray.filter(item => item[1].status)
    console.log(a)
  },
  methods: {
    SetVariable(nameO, nameV) {
      this.variant[`${nameO}`] = `${nameV}`
      this.notChecked = false
    },
    addCount() {
      this.quan++;
    },
    minusCount() {
      if (this.quan > 1) {
        this.quan--;
      }
    },
    NextSl(index) {
      if (+index + 1 == Object.keys(this.images).length) {
        this.images[index].status = false
        this.images[0].status = true
      } else {
        let nextI = +index + 1
        this.images[index].status = false
        this.images[nextI].status = true
      }
    },
    backSl(index) {
      if (index == 0) {
        let n = Object.keys(this.images).length - 1
        this.images[index].status = false
        this.images[n].status = true
      } else {
        let nextI = +index - 1
        this.images[index].status = false
        this.images[nextI].status = true
      }
    },
    imgClick(id) {
      for (let img in this.images) {
        if (this.images[img].id == id) {
          this.images[img].status = true
        } else {
          this.images[img].status = false
        }
      }
    },
    async addToCart() {
      if (!this.data.options) {
        updateSharedString(this.variant.quan)
        await swell.cart.addItem({
          product_id: this.data.id,
          quantity: this.variant.quan,
        });
      } else if (this.data.options && Object.keys(this.variant).length == Object.keys(this.data.options).length) {
        updateSharedString(this.quan)
        await swell.cart.addItem({
          product_id: this.data.id,
          quantity: this.quan,
          options: this.variant
        });
      } else {
        this.notChecked = true
      }
    }
  }
}
</script>

<style></style>
  