let webstore = new Vue({

    el: '#app',
    data: {
        sitename: 'After School Club',
        products: [{
                id: 1,
                subject: "Math",
                location: "London",
                price: 66,
                img: "img/math.png",
                imgAlt: 'Math image',
                spaces: 5,
            },
            {
                id: 2,
                subject: "English",
                location: "Liverpool",
                price: 99.99,
                img: "img/english.png",
                imgAlt: 'Book image',
                spaces: 10
            },
            {
                id: 3,
                subject: "History",
                location: "Boston",
                price: 66,
                img: "img/history.png",
                imgAlt: 'History image',
                spaces: 30,

            },
            {
                id: 4,
                subject: "Geography",
                location: "Athens",
                price: 49.99,
                img: "img/geo.png",
                imgAlt: 'Math image',
                spaces: 5,
            },
            {
                id: 2,
                subject: "Computer Science",
                location: "Paris",
                price: 300,
                img: "img/cs.png",
                imgAlt: 'Book image',
                spaces: 50
            },
            {
                id: 3,
                subject: "Biology",
                location: "Manchester",
                price: 66,
                img: "img/bio.png",
                imgAlt: 'History image',
                spaces: 30,

            }
        ],

        cart: [],

    },

    computed: {
        cartItemCount: function () {
            return this.cart.length || 0;
        },

        canAddToCart: function () {
            this.products.forEach(function (prod) {
                console.log(prod.spaces);
            })
        }
    },

    methods: {
        addToCart: function () {
            console.log("asdasd");
            this.cart.push(this.products.id);
        }
    },


    filters: {
        formatPrice: function (price) {
            if (!parseInt(price)) {
                return "";
            }
            if (price > 99999) {
                let priceString = (price / 1).toFixed(2);
                let priceArray = priceString.split("").reverse();
                let index = 3;
                while (priceArray.length > index + 3) {
                    priceArray.splice(index + 3, 0, ", ");
                    index += 4;
                }
                return "£" + priceArray.reverse().join("");
            } else {
                return "£" + (price / 1).toFixed(2);
            }
        }
    }

});