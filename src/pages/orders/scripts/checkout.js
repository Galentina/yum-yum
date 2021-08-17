// import {storage} from "../../index/scripts";


export class Checkout {
    #checkoutTime;
    #restaurants;
    #orders;

    constructor(items, date){
        // const dateOfOrder = storage.getItems('date').checkoutDate;
        const formatOrders = () => {
            let arr = [];
            const data = items.map(el => {
                el.orders.map(order => arr.push({id: order.id, price: order.price, title: order.title, count: order.count}))
                console.log("orders val", data)
            }); return data;
        }
        const orderPlaces = [];
        items.map(el=> orderPlaces.push(el.restaurant));
        this.#orders = formatOrders();
        this.#checkoutTime = date;
        this.#restaurants = orderPlaces;
        this.ifOrderFinished = (Date.now() - this.#checkoutTime >= 6000);
    }
    getRestaurant = () =>{
        return this.#restaurants;
    }
    getCheckoutTime = () =>{
        return Date.now() - this.#checkoutTime;
    }
    getFormattedDate = () =>{
        const formatDate = this.#checkoutTime.date + ' ' + this.#checkoutTime.getMonth() + ' ' + this.#checkoutTime.getFullYear();
        console.log("form data", formatDate);
        return formatDate;
    }
    getFormattedTime = () => {
        const formatDate = this.#checkoutTime.getHours() + ':' + this.#checkoutTime.getMinutes() + ':' + this.#checkoutTime.getSeconds();
        console.log("form time",formatDate);
        return formatDate;
    }
    getOrders = () => {
        return this.#orders;
    }
    getCheckoutTimePercent =() => {
        return ((Date.now() - this.#checkoutTime)/6000)*100;
    }
}
