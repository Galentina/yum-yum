import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import {Dish} from "./counter";
import {Storage} from "../../storage";
import {productsBrand} from "./currentBrand";
import {selectorButtons} from "./selector";


export let storage = new Storage();

storage.setItems('current products', dominosArray);

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

document.getElementById('basket').innerHTML = '0';
// upload a chosen brand on the page and into storage
const featured = document.querySelector('.featured');
const brands = featured.querySelectorAll('a');
for (let i=0; i<brands.length; i++) {
    const brand = brands[i];
    productsBrand(brand);
}

const basketImage = document.getElementById('basketImage');
basketImage.addEventListener('click', () =>{
document.getElementById('drawer').className = 'overlay visible';
})

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


console.log('index');

