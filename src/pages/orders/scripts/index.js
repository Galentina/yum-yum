import '../../../styles/index.scss';
import { Checkout } from "./checkout";
import { fromRestaurant } from "./fromRestaurants";
import {storage} from "../../storage";
import {removeAllChildrenFromNode} from "../../index/scripts/removeAllChildrenFromNode";
import {checkList, deleteItemFromList} from "../../index/scripts/checkList";
import {finalPrice} from "../../index/scripts/finalPrice";


if (storage.getItems('delivery')) {
    document.getElementById("location1").value = storage.getItems('delivery').place;
    document.getElementById("deliveryWay1").value = storage.getItems('delivery').delivery;
} else {
    storage.setItems('delivery', {place: "Amsterdam", delivery: "Take away"});
}

const fakeDate = new Date();
if (!storage.getItems('date')) storage.setItems('date', {checkoutDate: fakeDate});

const clientsInfo = new Checkout();
const restaurants = clientsInfo.getRestaurant();

//Recall class Checkout with setup of order info
const timeSet = clientsInfo.getCheckoutTime();
restaurants.map(el=> {
    document.getElementById(el).innerHTML = String(timeSet);
    if (timeSet>0) {document.getElementById(`del-${el}`).innerHTML = 'Time for preparing'}
    else {document.getElementById(`del-${el}`).innerHTML = 'Ready for delivery'}
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

if (storage.getItems('order') && storage.getItems('order').length) {
    document.getElementById('basket1').innerHTML = storage.getItems('order').length;
}
// document.getElementById('numProd1').innerHTML = storage.getItems('order').length || '0';
//window Drawer, show all chosen items
const basketImage1 = document.getElementById('basketImage1');
basketImage1.addEventListener('click', () =>{
    document.getElementById('drawer1').className = 'overlay visible';
    document.getElementById('way1').innerHTML = storage.getItems('delivery').delivery + ' at ' + storage.getItems('delivery').place;
    if (storage.getItems('order') && storage.getItems('order').length) {
        document.getElementById('numProd1').innerHTML = storage.getItems('order').length;
    }
    const orders = storage.getItems('order');
    if (orders && orders.length!==0){
        //delete old list of items from basket
        let element = document.getElementById('orderList');
        element = removeAllChildrenFromNode( element );
        document.getElementById('orderList').replaceWith(element);
        // set new list of items into basket

        checkList(orders);
        const finalPrice = storage.getItems('final price').sum;
        document.getElementById('spPrice').innerHTML = `(price ${finalPrice} &#8364;)`
    }
});


const checkout = document.getElementById('finalPrice');
checkout.addEventListener('click', ()=>{
    // doCheckout();
    document.getElementById('drawer1').className = 'overlay';
})

const closeDrawer = document.getElementById('closeDrawer1');
closeDrawer.addEventListener('click', () =>{
    document.getElementById('drawer1').className = 'overlay';
});
//_________________________________
// Final price

const moreTreats = document.getElementById('moreTreats1');
moreTreats.addEventListener('click', ()=>{
    document.getElementById('drawer1').className = 'overlay';
    window.location.href = './';
});



console.log('orders');
