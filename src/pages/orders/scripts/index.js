import '../../../styles/index.scss';
import { Checkout } from "./checkout";
import { fromRestaurant } from "./fromRestaurants";




const clientsInfo = new Checkout();
const restaurants = clientsInfo.getRestaurant();

//Recall class Checkout with setup of order info
const timeSet = clientsInfo.getCheckoutTime();
restaurants.map(el=> {
    document.getElementById(el).innerHTML = String(timeSet);
});

//Day, time setup for restaurants.
// Organizing Popular orders and Previous orders for restaurants
restaurants.map(el=> {
    document.getElementById(`d-${el}`).innerHTML = clientsInfo.getFormattedDate();
    document.getElementById(`t-${el}`).innerHTML = clientsInfo.getFormattedTime();
    fromRestaurant(el);
})


//Not used class functions
const remainTime = clientsInfo.getCheckoutTimePercent();
console.log("remainTime", remainTime);


// deliveryObject();
console.log('orders');
