let webstore = new Vue({

    el: '#app',
    data: {
        sitename: 'After School Club',
        showProduct: false,
        products: [{
                id: 1,
                subject: "Math",
                location: "London",
                price: 66,
                img: "img/math.png",
                imgAlt: 'Math icon',
                spaces: 6,
            },
            {
                id: 2,
                subject: "Book Club",
                location: "Liverpool",
                price: 5.99,
                img: "img/english.png",
                imgAlt: 'Book icon',
                spaces: 10
            },
            {
                id: 3,
                subject: "Dance Club",
                location: "Boston",
                price: 66,
                img: "img/dance.png",
                imgAlt: 'Dancing icon',
                spaces: 30,

            },
            {
                id: 4,
                subject: "Chess Club",
                location: "Lisbon",
                price: 15,
                img: "img/chess.png",
                imgAlt: 'Chess icon',
                spaces: 5,
            },
            {
                id: 5,
                subject: "Drama Club",
                location: "Paris",
                price: 24.99,
                img: "img/drama.png",
                imgAlt: 'Drama icon',
                spaces: 50
            },
            {
                id: 6,
                subject: "Art Club",
                location: "Manchester",
                price: 34.99,
                img: "img/art.png",
                imgAlt: 'Art icon',
                spaces: 30,

            }
        ],

        order: {
            firstName: "",
            lastName:"",
            address:"",
            postCode:"",
            city:"",
            countries:{
                AUT:"Austria",
                BEL:"Belgium",
                BGR:"Bulgaria",
                HRV:"Croatia",
                CYP:"Cyprus",
                CZE:"Czech Republic",
                DNK:"Denmark",
                EST:"Estonia",
                FIN:"Finland",
                FRA:"France",
                DEU:"Germany",
                GRC:"Greece",
                HUN:"Hungary",
                IRL:"Ireland",
                ITA:"Italy",
                LVA:"Latvia",
                LTU:"Lithuania",
                LUX:"Luxembourg",
                MLT:"Malta",
                NLD:"Netherlands",
                POL:"Poland",
                PRT:"Portugal",
                ROU:"Romania",
                SVK:"Slovakia",
                SVN:"Slovenia",
                ESP:"Spain",
                SWE:"Sweden",
                GBR:"United Kingdom"
            },

            states:{
            AL: 'Alabama',
            AR: 'Arizona',
            CA: 'California',
            NV: 'Nevada',
            },

            gift:"No",
            wrapGift: "Yes",
            noWrap: "No",
            method:"",
        },

        cart: [],

    },

    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },

        
    },

    methods: {

        showCheckOut(){
            this.showProduct = this.showProduct ? false : true;
        },

        addToCart: function (product) {
            this.cart.push(product.id);
            product.spaces--;
        },

        canAddToCart: function (product) {
            
            return product.spaces > 0 ;
        },

        cartCount:function(id){
                let count =0;
                for(let i=0; i< this.cart.length;i++){
                    if(this.cart[i]===id){
                        console.log(this.cart[i] + " cart");
                        console.log(i+" iterator");
                        console.log(count);
                        count++
                    }
                }

                return count;

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