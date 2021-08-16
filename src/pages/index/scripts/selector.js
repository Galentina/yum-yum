

export const selectorButtons = () =>{
    //setup quantity of products after switching brand from one to other
    const quantity = document.querySelectorAll('.dish');
    const selectedButtons = [];
    for (let i=0; i<quantity.length; i++) {
        const allButtons = quantity[i].querySelectorAll('button');
        for (let j = 0; j < allButtons.length; j++) {
            selectedButtons.push(allButtons[j]);
        }
    } return selectedButtons;
};

export const selectorCounters = () => {
    const dish = document.querySelectorAll('.dish');
    const quantity = [];
    for (let i = 0; i < dish.length; i++) {
        const allCounters = dish[i].getElementsByTagName('span');
        for (let j = 0; j < allCounters.length; j++) {
            quantity.push(allCounters[j]);
        }
    } return quantity;
};
