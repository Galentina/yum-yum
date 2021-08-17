

import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import {Dish} from "./counter";
import {storage} from "../../storage";
import {productsBrand} from "./currentBrand";
import {selectorButtons} from "./selector";
import {checkList, deleteItemFromList} from "./checkList";
import {removeAllChildrenFromNode} from "./removeAllChildrenFromNode";
import {deliveryObject} from "./deliveryObject";
import {doCheckout} from "./doCheckout";


storage.setItems('current products', dominosArray);
storage.setItems('delivery', {place: "Amsterdam", delivery: "Take away"});

// Add product to storage
function addCount(imageId){
    let orders = storage.getItems('current products');
    const orderItems = orders.map((item)=> new Dish(item));
    orderItems.map(el=> {
        let index = +imageId[0];
        let sign = +imageId[1];
        if (el.id === index) {
            el.count = el.setCount(sign);
            let num;
            if (storage.getItems('order').length !== 0) {
                num = storage.getItems('order').filter(item => (item.title === el.title && item.id === el.id))[0].count || 0;
            }
            else num = '0';
            const element = document.getElementById(`${index}`);
            element.innerHTML = String(num);
            if (sign === 1) {
                document.getElementById(`${index*10}`).style.display = 'inherit';
            }
            else if (el.count === 0) {
                document.getElementById(`${index*10}`).style.display = 'none';
                }
            }
    });
    return orders;
}

//_________________________________
//Basket = 0
document.getElementById('basket').innerHTML = '0';

//_________________________________
//delivery form into storage
deliveryObject();


//_________________________________
// upload a chosen brand on the page and into storage
const featured = document.getElementById('featured');
const brands = featured.querySelectorAll('a');
for (let i=0; i<brands.length; i++) {
    const brand = brands[i];
    productsBrand(brand);
}

// select all buttonsItems from DOM for click
const selectedButtons = selectorButtons();
// button is selected and function addCount is requested
for (let i=0; i<selectedButtons.length; i++) {
    const button = selectedButtons[i];
    button.addEventListener('click', () => {
        const id = button.id;
        addCount(id);
    });
}

//_________________________________
//window Drawer, show all chosen items
const basketImage = document.getElementById('basketImage');
basketImage.addEventListener('click', () =>{
    document.getElementById('drawer').className = 'overlay visible';
    const orders = storage.getItems('order');
    if (orders && orders.length!==0){
        //delete old list of items from basket
        let element = document.getElementById('orderList');
        element = removeAllChildrenFromNode( element );
        console.log(element);
        document.getElementById('orderList').replaceWith(element);
        // set new list of items into basket
        checkList(orders);
        deleteItemFromList();
    }
});


const checkout = document.getElementById('finalPrice');
checkout.addEventListener('click', ()=>{
    doCheckout();
})

const closeDrawer = document.getElementById('closeDrawer');
closeDrawer.addEventListener('click', () =>{
    document.getElementById('drawer').className = 'overlay';
});
//_________________________________
// Final price

const moreTreats = document.getElementById('moreTreats');
moreTreats.addEventListener('click', ()=>{
    document.getElementById('drawer').className = 'overlay';
});





console.log('index');

