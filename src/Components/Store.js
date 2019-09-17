import {BehaviorSubject} from "rxjs";
let shoppingBasketArr = [];

export const currentShoppingBasket$ = new BehaviorSubject(shoppingBasketArr);

export function updateShoppingBasket(shoppingBasketArr){
    if(shoppingBasketArr) currentShoppingBasket$.next(shoppingBasketArr);
}