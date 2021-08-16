

// show all chosen items, creating additional DOM elements
export const checkList = (orders) => {
    const orderListItem = document.getElementById('orderListItem');
    const fragment = new DocumentFragment();
    const element = document.getElementById('orderList');
    for (let i=0; i<orders.length; i++) {
        const orderListItemNew = orderListItem.cloneNode(true);
        orderListItemNew.querySelector('.order-item__image').src = orders[i].image;
        orderListItemNew.querySelector('span').innerHTML = orders[i].count +' X';
        orderListItemNew.querySelector('h3').innerHTML = orders[i].title;
        orderListItemNew.querySelector('.order-item__price').innerHTML = orders[i].price + ' &#8364;';
        fragment.append(orderListItemNew);
    }
    element.append(fragment);
};
