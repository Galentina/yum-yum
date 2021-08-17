

// show all chosen items, creating additional DOM elements
import {storage} from "./index";
import {removeAllChildrenFromNode} from "./removeAllChildrenFromNode";

export const checkList = (orders) => {
    const orderListItem = document.getElementById('orderListItem');
    const fragment = new DocumentFragment();
    const element = document.getElementById('orderList');
    for (let i=0; i<orders.length; i++) {
        const orderListItemNew = orderListItem.cloneNode(true);
        orderListItemNew.querySelector('img').parentElement.id = `${orders[i].id}i`;
        orderListItemNew.querySelector('.order-item__image').src = orders[i].image;
        orderListItemNew.querySelector('span').innerHTML = orders[i].count +' X';
        orderListItemNew.querySelector('h2').innerHTML = orders[i].restaurant;
        orderListItemNew.querySelector('h3').innerHTML = orders[i].title;
        orderListItemNew.querySelector('.order-item__price').innerHTML = orders[i].price + ' &#8364;';
        orderListItemNew.querySelector('button').id = `${(i+1)*10}item`;
        fragment.append(orderListItemNew);
    }
    element.append(fragment);
};


export const deleteItemFromList = () => {
    const orderList = document.getElementById('orderList');
    console.log('bin', orderList);
    const bin = orderList.getElementsByTagName('button') || [];

    console.log('bin', bin);
    for (let i=0; i<bin.length; i++) {
        bin[i].addEventListener('click', () => {
            // const id = bin[i].id[0];
            const item = bin[i].parentElement;
            let id =parseInt(bin[i].parentElement.id);
            console.log(id);
            let title = item.querySelector('h3').innerHTML;
            let restaurant = item.querySelector('h2').innerHTML;
            storage.deleteItem({id: id, title: title, restaurant: restaurant });
            item.style.display = 'none';
            removeAllChildrenFromNode();
            const orders = storage.getItems('order');
            checkList(orders);
        })
    }
};
