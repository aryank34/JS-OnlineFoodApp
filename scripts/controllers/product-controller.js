// controller is the glue/linkage between view(html) and model(product storage)
//Data Exchange between View and Model

import { options } from "../services/payment.js";
import productOperations from "../services/product-operations.js";

function displayButtons(){
    const buttonDiv = document.querySelector('#buttons');

    const pizzaButton = document.createElement('button');
    pizzaButton.className = 'btn btn-danger';
    pizzaButton.innerText = 'Pizza Ghar';
    pizzaButton.style.marginRight='10px';
    pizzaButton.addEventListener('click',loadPizzas);
    buttonDiv.appendChild(pizzaButton);
    
    const burgerButton = document.createElement('button');
    burgerButton.className = 'btn btn-warning';
    burgerButton.style.marginRight='10px';
    burgerButton.innerText = "Mera Donald's";
    burgerButton.addEventListener('click',loadBurgers);
    buttonDiv.appendChild(burgerButton);

    const tacoButton = document.createElement('button');
    tacoButton.className = 'btn btn-info';
    tacoButton.style.marginRight='10px';
    tacoButton.innerText = "Taco Ghanta";
    tacoButton.addEventListener('click',loadTacos);
    buttonDiv.appendChild(tacoButton);
 
}
async function loadPizzas(){
    document.getElementById('rzp-button1').disabled = true;
    const outputDiv = document.querySelector('#output');
    outputDiv.innerHTML = '';

    const basket = document.querySelector('#basket');
    basket.innerHTML = '';

    const pizzas = await productOperations.loadPizzas();
    console.log('Pizzas are ',pizzas);

    for(let pizza of pizzas){
        prepareCard(pizza);
    }
    
}
async function loadBurgers(){
    document.getElementById('rzp-button1').disabled = true;
    const outputDiv = document.querySelector('#output');
    outputDiv.innerHTML = '';

    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    
    const burgers = await productOperations.loadBurgers();
    console.log('Burgers are ',burgers);

    for(let burger of burgers){
        prepareCard(burger);
    }
}

async function loadTacos(){
    document.getElementById('rzp-button1').disabled = true;
    const outputDiv = document.querySelector('#output');
    outputDiv.innerHTML = '';

    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    
    const tacos = await productOperations.loadTacos();
    console.log('Burgers are ',tacos);

    for(let taco of tacos){
        prepareCard(taco);
    }
}


//loadPizzas();
displayButtons();
var item = 0;
/*
<div class="col-4">
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</div>
*/

function prepareCard(obj){

    const outputDiv = document.querySelector('#output');

    const colDiv = document.createElement('div');
    colDiv.className="col-4";

    const cardDiv = document.createElement('div');
    cardDiv.className = "card";
    cardDiv.style = "width: 15rem;";
    colDiv.appendChild(cardDiv);

    const img = document.createElement('img');
    img.className = "card-img-top";
    img.src=obj.url;
    img.width = 150;
    img.height = 170;
    cardDiv.appendChild(img);

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = "card-body";
    cardDiv.appendChild(cardBodyDiv);

    const h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerText = obj.name;
    cardBodyDiv.appendChild(h5);

    const pTag = document.createElement('p');
    pTag.className = "card-text";
    pTag.innerText = obj.desc;
    cardBodyDiv.appendChild(pTag);

    const button = document.createElement('button');
    button.className = "btn btn-primary";
    button.innerText = "Add To Cart";
    button.addEventListener('click',addToCart); //Event Bind
    button.setAttribute('product-id',obj.id);
    cardBodyDiv.appendChild(button);

    outputDiv.appendChild(colDiv);
}

function addToCart(){
    //this - keyword (Current Calling object reference)
    //console.log('Add to cart called...',this);
    const currentButton = this;
    const objId = currentButton.getAttribute('product-id');
    //console.log('pizza id is ',pizzaId);
    productOperations.searchProducts(objId);
    printBasket();
    //console.log(item);
    options.amount = String(item);
    //console.log(options);
    payNow();
    
}

function payNow(){
    document.getElementById('rzp-button1').disabled = false;
    document.getElementById('rzp-button1').addEventListener('click',function(e){
        
        rzp1.open();
        e.preventDefault();
    });
    
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert('Payment Failed...');
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});
}

function printBasket(){
    const cartProducts = productOperations.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    for(let product of cartProducts){
        // const li = document.createElement('li');
        // li.innerText = `${product.name} ${product.price}`;
        // basket.appendChild(li);

        const cardDiv = document.createElement('div');
        cardDiv.className = "card";
        basket.appendChild(cardDiv);

        const cardBodyDiv1 = document.createElement('div');
        cardBodyDiv1.className = 'card-body';
        cardBodyDiv1.innerText = `${product.name} - ${product.count}`;
        cardDiv.appendChild(cardBodyDiv1);


        const cardBodyDiv2 = document.createElement('div');
        cardBodyDiv2.className = 'card-body text-end';
        cardBodyDiv2.innerText = `${product.price}`;
        cardDiv.appendChild(cardBodyDiv2);

    }
    const total = printTotal(cartProducts);
    const totalPTag = document.createElement('p');
    totalPTag.className = "col-8 alert alert-primary";
    totalPTag.innerText = `Total is ${total.toFixed(3)}`;
    basket.appendChild(totalPTag);

    item = total.toFixed(3)*100;
    
}

const printTotal = (pizzas) => pizzas.reduce((sum,pizza) => sum+parseFloat(pizza.price)*pizza.count,0);
