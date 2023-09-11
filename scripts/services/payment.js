
export var options = {
    "key": "rzp_test_FNCBj0ju77MXxU", // Enter the Key ID generated from the Dashboard
    // "amount": "10000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "amount": "1000",
    "currency": "INR",
    "name": "Online Food App", //your business name
    "description": "Order from your favorite restaurants",
    "image": "https://example.com/your_logo",
    "handler": function (response){
        alert('Payment Done...');
        emptyFields();
        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Customer Name", //your customer's name
        "email": "customerEmail@example.com", 
        "contact": "Customer Phone"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

// document.getElementById('rzp-button1').addEventListener('click',function(e){
//     rzp1.open();
//     e.preventDefault();
// });

// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response){
//         alert('Payment Failed...');
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });

function emptyFields(){
    const outputDiv = document.querySelector('#output');
    const basket = document.querySelector('#basket');
    outputDiv.innerHTML = '';
    basket.innerHTML = '';
    document.getElementById('rzp-button1').disabled = true;
}
