import {deliveryWay, location} from "./elements";
import {finalPrice} from "./finalPrice";
import {storage} from "./index";


export const deliveryObject = () =>{
    let aboutDelivery = storage.getItems('delivery');
    location.addEventListener('change',function() {
        aboutDelivery.place = this.value;
        const del = aboutDelivery.delivery;
        storage.setItems('delivery', {place: aboutDelivery.place, delivery: aboutDelivery.delivery});
        finalPrice();
    });
    deliveryWay.addEventListener('change', function() {
        aboutDelivery.delivery = this.value;
        const place = aboutDelivery.place;
        storage.setItems('delivery', {place: aboutDelivery.place, delivery: aboutDelivery.delivery});
        finalPrice();
    });
};
