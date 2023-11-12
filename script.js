let webstore = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        showProduct: true,
        products: products,

        order: {
            firstName: "",
            lastName: "",
            address: "",
            postCode: "",
            city: "",
            gift: "No",
            wrapGift: "Yes",
            noWrap: "No",
            method: "",
        },

        cart: [],

        sortBy:"",
        search:"",

        displayFilters: false,

    },

    computed: {

        // itemsLeft:function(){
        //     return (product) => product.spaces ;
        // },

        cartItemCount: function () {
            console.log(this.cart.length || 0);
            return this.cart.length || 0;
        },


        searched: function(){
            let searchProducts =  this.products.filter((product) => {

                return product.subject.match(this.search);
            
            })

            if(this.sortBy === 'subject'){
                console.log(sortBy);
                return this.products.slice().sort((a, b) => a.subject.localeCompare(b.subject))
                
            } else if(this.sortBy === 'location'){
                return this.products.slice().sort((a, b) => a.location.localeCompare(b.location))
            }else if(this.sortBy === 'price'){
                return searchProducts.slice().sort((a, b) => a.price - b.price);
            }


            return searchProducts;
        },

        
    },
    

    methods: {

        showCheckOut() {
            this.showProduct = this.showProduct ? false : true;
        },

        addToCart: function (product) {
            this.cart.push(product.id);
            product.spaces--;
        },

        canAddToCart: function (product) {
            return product.spaces > 0;
        },

        cartCount: function (id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++
                }
            }

            return count;

        },

        getProdID: function (id) {

            let storeProds = []
            let keepTrack = 0;
            let qty = 1;

            for (let i = 0; i < cart.length; i++) {

                if (keepTrack < 0) {
                    if (id === cart[i]) {
                        qty++;
                        storeProds.push({
                            subject: products.find(lesson => lesson.id === id).subject,
                            qty: qty
                        })


                    }

                    keepTrack++;

                }


            }

            return storeProds;



        },

        toggleFilters: function(){
            this.displayFilters = !this.displayFilters;
        },

        sortBy:function(filter){
            this.sortBy = filter
    },
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