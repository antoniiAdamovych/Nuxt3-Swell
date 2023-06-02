// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["@/assets/style.sass"],
    app: {
        head: {
            link: [
                {rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap'},
                {rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/vue-agile/dist/VueAgile.css'},
            ],
            script: [
                { src: "https://unpkg.com/vue-agile" },
            ]
        }
    },
})
