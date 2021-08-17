import {storage} from "./index";
import {deliveryObject} from "./deliveryObject";

export const finalPrice = () => {
    deliveryObject();
    const aboutDelivery = storage.getItems('delivery');
    const aboutFinalPrice = document.getElementById('spPrice');
    const aboutPrice = storage.getItems('order');

    const delPrice = document.getElementById('deliveryPrice');
    (aboutDelivery.delivery === 'Delivery') ? delPrice.innerHTML = '5 ' + '&#8364' : delPrice.innerHTML = '0 ' + '&#8364';
    let sum = 0;
    if (aboutPrice.length) {
        aboutPrice.map(el => sum = Number(el.price) * Number(el.count) + sum);
        if (aboutDelivery.delivery === 'Delivery') {
            sum = sum + 5;
        }

    } aboutFinalPrice.innerHTML = '  (' + `${sum}` + '&#8364;)';
};
