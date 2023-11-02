
let webstore = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        showProduct: true,
        products: lessons,

        order: {
            firstName: "",
            lastName:"",
            address:"",
            postCode:"",
            city:"",
            countries:{

                "AUT":{
                    country:"Austria",
                    code:"+43"
                },
                "BEL":{
                    country:"Belgium",
                    code:"+32"
                },
                
                "BGR":{
                    country:"Bulgaria",
                    code:"+359"
                },
                "HRV":{
                    country:"Croatia",
                    code:"+385"
                },
                "CYP":{
                    country:"Cyprus",
                    code:"+357"
                },
                "CZE":{
                    country:"Czech Republic",
                    code:"+420"
                },
                "DNK":{
                    country:"Denmark",
                    code:"+45"
                },
                "EST":{
                    country:"Estonia",
                    code:"+372"
                },
                "FIN":{
                    country:"Finland",
                    code:"+358"
                },
                "FRA":{
                    country:"France",
                    code:"+33"
                },
                "DEU":{
                    country:"Germany",
                    code:"+49"
                },
                "GRC":{
                    country:"Greece",
                    code:"+30"
                },
                "HUN":{
                    country:"Hungary",
                    code:"+36"
                },
                "IRL":{
                    country:"Ireland",
                    code:"+353"
                },
                "ITA":{
                    country:"Italy",
                    code:"+39"
                },
                "LVA":{
                    country:"Latvia",
                    code:"+371"
                },
                "LTU":{
                    country:"Lithuania",
                    code:"+370"
                },
                "LUX":{
                    country:"Luxembourg",
                    code:"+352"
                },
                "MLT":{
                    country:"Malta",
                    code:"+356"
                },
                "NLD":{
                    country:"Netherlands",
                    code:"+31"
                },
                "POL":{
                    country:"Poland",
                    code:"+48"
                },
                "PRT":{
                    country:"Portugal",
                    code:"+351"
                },
                "ROU":{
                    country:"Romania",
                    code:"+40"
                },
                "SVK":{
                    country:"Slovakia",
                    code:"+421"
                },
                "SVN":{
                    country:"Slovenia",
                    code:"+386"
                },
                "ESP":{
                    country:"Spain",
                    code:"+34"
                },
                "SWE":{
                    country:"Sweden",
                    code:"+46"
                },
                "GBR":{
                    country:"United Kingdom",
                    code:"+44"
                }
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