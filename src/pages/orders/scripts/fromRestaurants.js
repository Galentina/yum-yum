import {storage} from "../../storage";


export const fromRestaurant = (restaurant) => {
    const finalOrders = storage.getItems('order');
    const arr = [];
    if (finalOrders && finalOrders.length) {
        finalOrders.map(el => el.restaurant === restaurant ? arr.push(el) : el);
    }
    if (arr.length===0) {
        // document.getElementById(`w-${restaurant}`).style.display = 'none';
        // document.getElementById(`r-${restaurant}`).style.display = 'none';
    } else {
        for (let i=0; i<arr.length; i++) {
            const list = document.getElementById(`list-${restaurant}`);
            const getLiHTML =
                `<li class="previous-item-dishes__item">
                  <span class="previous-item-dishes__quantity">${i+1}</span>
                  ${arr[i].title}
            </li>`;
            list.insertAdjacentHTML('beforeend', getLiHTML);
        }
    }
    return arr;
};
