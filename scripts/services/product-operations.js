//Product CRUD Operations
//This will act as a linkage between web api json and the product json storage

import Product from "../models/product.js";
import {doNetworkCallPizza, doNetworkCallBurger, doNetworkCallTaco} from "./api-client.js"

// Contains logic for fetching, adding, sorting, searching, deletion, updation

// it talks to the network layer to bring the json and convert the json into objects and vice versa


const productOperations = {
    products:[], //key:value
    async loadPizzas() {
        const pizzas = await doNetworkCallPizza();
        const pizzaArray = pizzas['Vegetarian'];
        const newPizzaProducts = pizzaArray.map(pizza => {
            const currentPizza = new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
            return currentPizza;
        })
        this.products = newPizzaProducts;
        return newPizzaProducts; //since function is async, this return object/array will WRAP to promise
    },
    async loadBurgers(){
        const burgers = await doNetworkCallBurger();
        const burgerArray = burgers['Vegetarian'];
        const newBurgerProducts = burgerArray.map(burger => {
            const currentBurger = new Product(burger.id, burger.name, burger.menu_description, burger.price, burger.assets.product_details_page[0].url);
            return currentBurger;
        })
        this.products = newBurgerProducts;
        return newBurgerProducts;
    },
    async loadTacos(){
        const tacos = await doNetworkCallTaco();
        const tacoArray = tacos['Vegetarian'];
        const newTacoProducts = tacoArray.map(taco => {
            const currentTaco = new Product(taco.id, taco.name, taco.menu_description, taco.price, taco.assets.product_details_page[0].url);
            return currentTaco;
        })
        this.products = newTacoProducts;
        return newTacoProducts;
    },
    getProductsInCart() {
        const productInBasket = this.products.filter(product => product.isAddedInCart);
        return productInBasket;
    },
    searchProducts(id) {
        const product = this.products.find(currProduct => currProduct.id == id);
        console.log('Product Found ',product);
        product.isAddedInCart = true;
        product.count += 1;
    }
}

export default productOperations;