
let webstore = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        showProduct: true,
        products: null,
        order: {
            firstName: null,
            lastName: null,
            address: null,
            phone: null,
            postCode: null,
            city: null,
            countries: {

                "AUT": {
                    country: "Austria",
                    code: "+43"
                },
                "BEL": {
                    country: "Belgium",
                    code: "+32"
                },

                "BGR": {
                    country: "Bulgaria",
                    code: "+359"
                },
                "HRV": {
                    country: "Croatia",
                    code: "+385"
                },
                "CYP": {
                    country: "Cyprus",
                    code: "+357"
                },
                "CZE": {
                    country: "Czech Republic",
                    code: "+420"
                },
                "DNK": {
                    country: "Denmark",
                    code: "+45"
                },
                "EST": {
                    country: "Estonia",
                    code: "+372"
                },
                "FIN": {
                    country: "Finland",
                    code: "+358"
                },
                "FRA": {
                    country: "France",
                    code: "+33"
                },
                "DEU": {
                    country: "Germany",
                    code: "+49"
                },
                "GRC": {
                    country: "Greece",
                    code: "+30"
                },
                "HUN": {
                    country: "Hungary",
                    code: "+36"
                },
                "IRL": {
                    country: "Ireland",
                    code: "+353"
                },
                "ITA": {
                    country: "Italy",
                    code: "+39"
                },
                "LVA": {
                    country: "Latvia",
                    code: "+371"
                },
                "LTU": {
                    country: "Lithuania",
                    code: "+370"
                },
                "LUX": {
                    country: "Luxembourg",
                    code: "+352"
                },
                "MLT": {
                    country: "Malta",
                    code: "+356"
                },
                "NLD": {
                    country: "Netherlands",
                    code: "+31"
                },
                "POL": {
                    country: "Poland",
                    code: "+48"
                },
                "PRT": {
                    country: "Portugal",
                    code: "+351"
                },
                "ROU": {
                    country: "Romania",
                    code: "+40"
                },
                "SVK": {
                    country: "Slovakia",
                    code: "+421"
                },
                "SVN": {
                    country: "Slovenia",
                    code: "+386"
                },
                "ESP": {
                    country: "Spain",
                    code: "+34"
                },
                "SWE": {
                    country: "Sweden",
                    code: "+46"
                },
                "GBR": {
                    country: "United Kingdom",
                    code: "+44"
                }
            },
            gift: "No",
            wrapGift: "Yes",
            noWrap: "No",
            method: "",
        },

        cart: [],
        userDetailsForm:[],
        basketForm: [],

        search: "",
        valid: false, //valid if name last name and phone number has been filled

    },

    computed: {

        

        isValid: function () {
            // 
            // console.log("First Name:", this.order.firstName);
            // console.log("Last Name:", this.order.lastName);
            // console.log("Phone:", this.order.phone);
            // console.log("Cart Length:", this.cart.length);

            if (this.order.firstName !== null && this.order.lastName !== null && this.order.phone !== null && this.cart.length > 0) {
                this.valid = true;

            } else {
                this.valid = false;
            }

            return this.valid;
        },

        cartItemCount: function () {
            let totalQty = 0;

            for(let i = 0; i < this.cart.length; i++){
                if('qty' in this.cart[i]){
                    totalQty += this.cart[i].qty;
                }
            }

            return totalQty;
        },


        searched: function () {
            let searchProducts = this.products.filter((product) => {

                return product.subject.match(this.search);

            })


            return searchProducts;
        },

        


    },


    methods: {


        updateBasketInfo(){

            this.cart.forEach((element) => {


                this.basketForm.push({
                    itemsInfo: {
                        id: element.id,
                        numSpaces: element.qty,
                        updateInventory: element.availableInventory
                    }
                })
            })


            
        },
        placeOrder() {

            this.updateBasketInfo()

            // this.basketForm.itemsInfo
            this.userDetailsForm.push({
                firstName:this.order.firstName,
                lastName:this.order.lastName,
                phone:this.order.phone,
            })

        
            const basketData = [];
        
            // for (const key in this.userDetailsForm) {
            //     userData[key] = this.userDetailsForm[key];
            // }
        
        
            this.basketForm.forEach((item) => {
                const lessonID = item.itemsInfo.id;
                const numSpaces = item.itemsInfo.numSpaces;
                const updateSpaces = item.itemsInfo.updateInventory - numSpaces;
                
                basketData.push({
                    productID: lessonID,
                    numSpaces: numSpaces,
                    updateInv: updateSpaces,

                })
            });
        
            const orderInfo = {
                firstName: this.userDetailsForm[0].firstName,
                lastName: this.userDetailsForm[0].lastName,
                phone: this.userDetailsForm[0].phone,
                basketData
            };
            // https://store-env.eba-xvfgdgap.eu-west-2.elasticbeanstalk.com/collections/products/orderPlaced

                fetch(`https://store-env.eba-xvfgdgap.eu-west-2.elasticbeanstalk.com/collections/orders/orderPLaced`,
                {
                    method:"POST",
                    
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
    
                    body:JSON.stringify({
                        orderInfo
                    })
                })
                .then((response) => response.json())
                .then(data =>{
                    console.log(data);

                    fetch(`http://localhost:3000/collections/products`, {

                        method:"PUT",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                            orderInfo
                        })
                    })
                    .then((response)=> response.json())
                    .then(data => {
                        console.log(data);
                    })

                    alert(data)
                    location.reload()
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                })



                fetch(``)

            },

        showCheckOut() {
                this.showProduct = this.showProduct ? false : true; 
        },
        showProductPage() {
            this.showProduct = this.showProduct ? false : true; 
        },

        increase:function(product){

            let getItem = this.products.find((element) => element.id == product.id);

            let qty = product.qty;

            if(getItem.spaces > 0){
                product.qty++;
                getItem.spaces--;

            }
            

            
        },

        decrease: function(product){
            let getItem = this.products.find((element) => element.id == product.id);

           

            const updateSpaces = this.products.findIndex(element => element.id === product.id)
        
            if(product.qty <1){
                this.cart = this.cart.filter(item => !(item.qty === product.qty))  
            }else{
                product.qty--;
                getItem.spaces++;
            }

        },

        removeAlItems:function(product){

            let getItem = this.products.find((element) => element.id == product.id);

            this.cart = this.cart.filter(item => !(item.id === product.id))

            getItem.spaces = 5;

        },


        removeAllItemsFromCart:function(cart){

            const deleteAll = cart.map(item => item.id);
            
            cart.splice(0, cart.length)

            this.products.forEach(item=>{
                if(deleteAll.includes(item.id))
                item.spaces = 5;
            })

            

            
        },

        addToCart: function (product) {
            let getItem = this.products.find((element) => element.id == product.id);


            const alreadyInCart = this.cart.findIndex(item => item.id === product.id)
            if(alreadyInCart !== -1){
                this.cart[alreadyInCart].qty++;
            }else{
                this.cart.push({
                    id: product.id,
                    qty:1,
                    subject:product.subject,
                    availableInventory: product.spaces
                })
            }
            
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

            let getItem = this.products.find((element) => element.id == id.id);

            
            
            return getItem
        },

        getProdImg: function (id) {

            let prod = this.getProdID(id);

            return prod.img
        },

        getProdQty(id) {


            let count = 0;

            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }

            return count;
        },

    },

    created: function () {
        fetch(`https://store-env.eba-xvfgdgap.eu-west-2.elasticbeanstalk.com/collections/products`)
            .then(function(response){
                response.json().then(
                    function(json){
                        webstore.products = json
                    }
                )
            })
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