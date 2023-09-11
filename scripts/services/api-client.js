//Network Call Code
//this will get the json file from the web api

const PizzaURL = "https://raw.githubusercontent.com/aryank34/JS-OnlineFoodApp/main/Pizza.json";
const BurgerURL = "https://raw.githubusercontent.com/aryank34/JS-OnlineFoodApp/main/Burger.json";
const TacoURL = "https://raw.githubusercontent.com/aryank34/JS-OnlineFoodApp/main/Taco.json";

export async function doNetworkCallBurger(){
    try{
        const response = await fetch(BurgerURL); //await - async wait, here fetch is an async call, so it will wait till it gets the response

        const object = await response.json();

        return object; // Wraps to promise 
    }catch(err){
        console.log('Some error in burger web api call ', err);
        throw err;
    }
}

export async function doNetworkCallTaco(){
    try{
        const response = await fetch(TacoURL); //await - async wait, here fetch is an async call, so it will wait till it gets the response

        const object = await response.json();

        return object; // Wraps to promise 
    }catch(err){
        console.log('Some error in taco web api call ', err);
        throw err;
    }
}

export async function doNetworkCallPizza(){
    //NEW STYLE CODE...
    try{
        const response = await fetch(PizzaURL); //await - async wait, here fetch is an async call, so it will wait till it gets the response

        const object = await response.json();

        return object; // Wraps to promise

    }catch(err){
        console.log('Some error in pizza web api call ', err);
        throw err;
    }

    //OLD STYLE CODE...

    // const promise = fetch(PizzaURL); //assigned to a thread from the pool of threads
    // console.log('Promise is ',promise);

    // promise.then(response => {
    //     console.log('Response is ',response);
    //     const promise2 = response.json(); //Deserialization - JSON to Object

    //     promise2.then(data => {
    //         console.log('Data is ',data);
    //     }).catch(e => {
    //         console.log('JSON parse error ',e);
    //     });

    // }).catch(err => {
    //     console.log('Error is ',err);
    // })

}

//export default doNetworkCallPizza;
//export default doNetworkCallBurger;
