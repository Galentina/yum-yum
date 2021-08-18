
// class storage for chosen brand and for orders
import {finalPrice} from "./index/scripts/finalPrice";

class Storage {
    getItems(key) {
        return JSON.parse(localStorage.getItem(key));
    };
    setItems(key, items) {
        let finalChoice;
        if (key === 'order') {
            finalChoice = items.filter(el => el.count !==0);
        } else finalChoice = items;
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(finalChoice));
        (key==='order') ? document.getElementById('basket').innerHTML = this.getItems('order').length : null;
    };

    addItem(item){
        const updateStorage = this.getItems('order') || [];
        let check = false;
        if (updateStorage.length) {
            for (let i=0; i<updateStorage.length; i++) {
                if (updateStorage[i].id === item.id && updateStorage[i].title === item.title) {
                    updateStorage[i].count += 1; check = true;
                }
            }
            if (check === false) {
                updateStorage.push(item);
            }
        } else {
            updateStorage.push(item);
        }
        this.setItems('order',updateStorage);
        finalPrice();
    }

    removeItem(item){
        const updateStorage = this.getItems('order');
            for (let i=0; i<updateStorage.length; i++) {
                if (updateStorage[i].id === item.id && updateStorage[i].title === item.title) {
                    updateStorage[i].count -= 1;
                }
            }
        this.setItems('order',updateStorage);
        finalPrice();
    }

    deleteItem(item){
        const updateStorage = this.getItems('order');
        const newUpdate = updateStorage.filter(el => el.title !== item.title || el.restaurant !== item.restaurant || el.id !==item.id);

        this.setItems('order', newUpdate);
        finalPrice();
    }

    // setFinalCheckout(item){
    //     localStorage.setItem('checkout', JSON.stringify(item));
    // }
}

const storage = new Storage();

export { storage };

