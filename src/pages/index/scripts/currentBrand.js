import dominosArray from "./data/dominos.json";
import {Dish} from "./counter";
import {dominoItem, kfcItem, mcDonaldItem} from "./elements";
import macArray from "./data/mac.json";
import kfcArray from "./data/kfc.json";
import {storage} from "../../storage";
import {selectorCounters} from "./selector";

//Change Brand
export const productsBrand = (brand) => {
    let chosenBrand;
    brand.addEventListener('click', () => {
        if (brand.id === 'dominoItem') {
            chosenBrand = dominosArray;
            mcDonaldItem.className = "featured__item featured-item";
            kfcItem.className = "featured__item featured-item";
            dominoItem.className = "featured__item featured-item active";
        } else if (brand.id === 'mcDonaldItem') {
            chosenBrand = macArray;
            mcDonaldItem.className = "featured__item featured-item active";
            kfcItem.className = "featured__item featured-item";
            dominoItem.className = "featured__item featured-item";
        } else if (brand.id === 'kfcItem') {
            chosenBrand = kfcArray;
            kfcItem.className = "featured__item featured-item active";
            mcDonaldItem.className = "featured__item featured-item";
            dominoItem.className = "featured__item featured-item";
        }
        // changing images and info according chosen brand
        const quantities = selectorCounters();

        for (let j = 0; j < chosenBrand.length; j++) {
            let image = document.getElementById(`i${j + 1}`);
            image.src = chosenBrand[j].img;
            let title = document.getElementById(`t${j + 1}`);
            title.innerHTML = chosenBrand[j].title;
            let price = document.getElementById(`p${j + 1}`);
            price.innerHTML = chosenBrand[j].price + ' ' + '&#8364';

            quantities[j].innerHTML='0';
            document.getElementById(`${(j+1)*10}`).style.display = 'none';

            //recover quantity ot chosen items
            let arr = storage.getItems('order');

            let arr1 = (arr && arr.length !==0) ? arr.filter(el => el.title === chosenBrand[j].title) : [];
            if (arr && arr.length !==0) arr1.map(el => el.id===j ? quantities[j].innerHTML=el.count : quantities[j].innerHTML=chosenBrand[j].count);
            else quantities[j].innerHTML = 0;

        }
        storage.setItems('current products', chosenBrand);
    });
};
