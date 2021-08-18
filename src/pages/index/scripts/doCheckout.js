import {storage} from "../../storage";


export const doCheckout = () => {
    const orders = storage.getItems('order');
    console.log("orders", orders);
    const mcDonalds = orders.filter(el => el.restaurant === "McDonald's");
    const domino = orders.filter(el => el.restaurant ==="Domino Pizza");
    const kfc = orders.filter(el => el.restaurant ==="KFC");
    const date = new Date();
    console.log(date);
    mcDonalds.map(el => delete el.restaurant);
    domino.map(el => delete el.restaurant);
    kfc.map(el => delete el.restaurant);
    // const checkoutList = [];
    // if (mcDonalds.length!==0) checkoutList.push({restaurant: "McDonald's", checkout: date, orders: mcDonalds});
    // if (domino.length!==0) checkoutList.push({restaurant: "Domino Pizza", checkout: date, orders: kfc});
    // if (kfc.length!==0) checkoutList.push({restaurant: "KFC", checkout: date, orders: kfc});
    // console.log("cek", checkoutList);
    // storage.setFinalCheckout(checkoutList);
    storage.setItems('date', {checkoutDate: date});
    window.location.href = 'orders.html';
}
