import {BehaviorSubject} from "rxjs";

export const shoppingBasket$ = new BehaviorSubject(window.localStorage.getItem('shoppingBasket'));
console.log(shoppingBasket$.value);

export function updateLocalStorage(shoppingBasket) {
  console.log(shoppingBasket);
  shoppingBasket$.next(shoppingBasket);
}