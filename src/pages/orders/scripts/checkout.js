import {storage} from "../../storage";
import moment from 'moment';


export class Checkout {
    #checkoutTime;
    #restaurants;
    #orders;

    constructor(){
        const dateOfOrder = storage.getItems('date');

        this.#orders = storage.getItems('orders');
        this.#checkoutTime = dateOfOrder.checkoutDate || '';
        this.#restaurants = ["McDonald's", "Domino Pizza", "KFC"];
        this.ifOrderFinished = Math.floor(Math.abs((Date.now() - Date.parse(this.#checkoutTime))/60000)) >= 60;
    }
    getRestaurant = () =>{
        return this.#restaurants;
    }
    getCheckoutTime = () =>{
        const remainTime =  Math.floor(Math.abs( 60 - (Date.now() - Date.parse(this.#checkoutTime))/60000));
        return remainTime

    }
    getFormattedDate = () =>{
        return moment(Date.parse(this.#checkoutTime)).format('Do MMMM YYYY');
    }
    getFormattedTime = () => {
        return moment(Date.parse(this.#checkoutTime)).format('h:mm a');
    }
    getOrders = () => {
        return this.#orders;
    }
    getCheckoutTimePercent =() => {
        return Math.floor(this.getCheckoutTime()*5/3);
    }
}
