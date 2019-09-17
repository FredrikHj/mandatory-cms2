import {BehaviorSubject} from "rxjs";
let shoppingBasketArr = [];
console.log(shoppingBasketArr);

export const currentShoppingBasket$ = new BehaviorSubject(shoppingBasketArr);

export function updateShoppingBasket(shoppingBasketArr){
    console.log(shoppingBasketArr);
    if(shoppingBasketArr) currentShoppingBasket$.next(shoppingBasketArr);
}