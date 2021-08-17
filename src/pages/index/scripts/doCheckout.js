import {storage} from "./index";


export const doCheckout = () => {
    const orders = storage.getItems('order');
    console.log("orders", orders);
    const mcDonalds = orders.filter(el => el.restaurant === "McDonald's") || [];
    const domino = orders.filter(el => el.restaurant ==="Domino Pizza") || [];
    const kfc = orders.filter(el => el.restaurant ==="KFC") || [];
    const date = new Date;
    mcDonalds.map(el => delete el.restaurant);
    console.log("MC", mcDonalds);
    domino.map(el => delete el.restaurant);
    console.log("dom", domino);
    kfc.map(el => delete el.restaurant);
    console.log("kfc", kfc);
    const checkoutList = [];
    checkoutList.push({restaurant: "McDonald's", checkout: date, orders: mcDonalds});
    checkoutList.push({restaurant: "Domino Pizza", checkout: date, orders: kfc});
    checkoutList.push({restaurant: "KFC", checkout: date, orders: kfc});
    console.log("cek", checkoutList);
    storage.setFinalCheckout(checkoutList);
    storage.setItems('date', {checkoutDate: date});
    window.location.href = 'orders.html';
}
