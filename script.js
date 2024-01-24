
let webstore = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        showProduct: true,
        products: null,
        order: {
            firstName: null,
            
            phone: null,
        },

        cart: [],
        userDetailsForm:[],
        basketForm: [],

        search: "",
        valid: false, //valid if name last name and phone number has been filled

    },

    computed: {

        

        isValid: function () {

            if ((this.order.firstName && this.order.phone !== null) && this.cart.length > 0) {
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

            //iterate cart array retreive each item 
            this.cart.forEach((element) => {


                //store retreived item in the array
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

            //fucntion call to insert items(id, spaces and item-inventory) in the cart array to basketForm array
            this.updateBasketInfo()



            //retrieve user details and insert into the userDetailsForm array
            this.userDetailsForm.push({
                firstName:this.order.firstName,
                phone:this.order.phone,
            })

        
            const basketData = [];
            const updateSpacesArray = []

            console.log(JSON.stringify(this.basketForm));
            //iterate basketForm array that contains info about (id, spaces and item-inventory)
            this.basketForm.forEach((item) => {
                const lessonID = item.itemsInfo.id;
                const numSpaces = item.itemsInfo.numSpaces;
                const updateSpaces = item.itemsInfo.updateInventory - numSpaces;
                
                //insert retrieved data into the basketData array
                basketData.push({
                    productID: lessonID,
                    numSpaces: numSpaces,

                })

                updateSpacesArray.push({
                    productID: lessonID,
                    updateInv: updateSpaces,

                })
            });

            console.log(JSON.stringify(updateSpacesArray));
        
            //array to hold all the info to be sent to the server
            const orderInfo = {
                firstName: this.userDetailsForm[0].firstName,
                phone: this.userDetailsForm[0].phone,
                basketData
            };

            
            

                fetch(`http://store-env.eba-xvfgdgap.eu-west-2.elasticbeanstalk.com/collections/orders/orderPlaced`,
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

                    fetch(`http://store-env.eba-xvfgdgap.eu-west-2.elasticbeanstalk.com/collections/products`, {

                        method:"PUT",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                            updateSpacesArray
                        })
                    })
                    .then((response)=> response.json())
                    .then(data => {
                        console.log(data);
                    })//end of fetch PUT

                    alert(data.msg)
                    location.reload()
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                })




            },

        showCheckOut() {
                this.showProduct = this.showProduct ? false : true; 
        },
        showProductPage() {
            this.showProduct = this.showProduct ? false : true; 
        },

        increase:function(product){

            //find the product in the products array
            let getItem = this.products.find((element) => element.id == product.id);

            //check if the found product spaces is greater than 0
            if(getItem.spaces > 0){
                product.qty++;
                getItem.spaces--;

            }
        },

        decrease: function(product){
            //find the product in the products array
            let getItem = this.products.find((element) => element.id == product.id);
        
            if(product.qty <=1){

                //check if each item in the cart array is not equal to the id of the product
                //to be deleted... create a new array without the deleted item and assign to cart array
                this.cart = this.cart.filter(item => !(item.id === product.id))
                getItem.spaces++;
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