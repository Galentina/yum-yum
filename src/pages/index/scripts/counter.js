import {storage} from "./index";
import {selectorCounters} from "./selector";

export class Dish {
    #count;
    constructor(item) {
        this.id = item.id;
        this.price = item.price;
        this.title = item.title;
        this.img = item.img;
        this.#count = item.count;
        this.restaurant = item.restaurant;
    }

    getCount = () => {
        let arr = storage.getItems('order');
        let finalCount = (arr && arr.filter(item => (item.title === this.title && item.id === this.id)).length !==0) ?
            arr.filter(item => (item.title === this.title && item.id === this.id))[0].count : this.#count;
        return finalCount;
    };

    setCount = (sign) => {
        if ( this.#count <0  || typeof this.#count !== 'number') {
            throw new Error('Count is not a number');
        } else {
            switch (sign) {
                case 1: {
                    this.#count = this.getCount() + 1;
                    storage.addItem({
                        id: this.id,
                        price: this.price,
                        title: this.title,
                        image: this.img,
                        count: this.#count,
                        restaurant: this.restaurant
                    });
                    break;
                }
                case 0: {
                    if (this.getCount() > 1) {
                        this.#count = this.getCount() - 1;
                        storage.removeItem({
                            id: this.id,
                            price: this.price,
                            title: this.title,
                            image: this.img,
                            count: this.#count,
                            restaurant: this.restaurant
                        });
                    } else {this.#count = 1;
                        this.#count = this.getCount() - 1;
                        document.getElementById(`${this.id*10}`).style.display = 'none';
                        const quantities = selectorCounters();
                        quantities.map(el => el.id !==this.id ? el.innerHTML = '0': el) ;
                        document.getElementById(`${this.id*10}`).style.display = 'none';
                        storage.deleteItem({
                            id: this.id,
                            price: this.price,
                            title: this.title,
                            image: this.img,
                            count: this.#count,
                            restaurant: this.restaurant
                        });
                    }
                        break;
                }
                default: {
                    console.log("Wrong imageId");
                }

            }
            let result = this.#count;
            return result;
        }
    };
}
