import {storage} from "./index";

export class Dish {
    #count;
    constructor(item) {
        this.id = item.id;
        this.price = item.price;
        this.title = item.title;
        this.img = item.img;
        this.#count = item.count;
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
                    storage.addItem({id: this.id, price: this.price, title: this.title, image: this.img, count: this.#count});
                    break;
                }
                case 0: {
                    if (this.getCount() > 0) {
                        this.#count = this.getCount() - 1;
                        storage.removeItem({
                            id: this.id,
                            price: this.price,
                            title: this.title,
                            image: this.img,
                            count: this.#count
                        });
                    } else {this.#count = 0;
                        storage.deleteItem({id: this.id, price: this.price, title: this.title, image: this.img, count: this.#count});
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
