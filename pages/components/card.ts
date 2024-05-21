import {Locator, Page, expect} from "@playwright/test"
import { json } from "stream/consumers";

export class Card{
    readonly page:Page;
    readonly cardContainer:Locator;
    readonly totalPrice:Locator;

    constructor(page:Page){
        this.page = page;
        this.cardContainer = page.locator("//ul[@class='products__list']");
        this.totalPrice = this.page.locator(".total-box__price");
    }

    async getTotalPrice(price:string):Promise<boolean>{
        let digit = await this.totalPrice.allInnerTexts();
        let res = JSON.stringify(digit) === price;
        return res;
    }

    async checkProductsInCardByName(productsNames:string[]):Promise<boolean>{
        let lisOfCardProductsText = await this.cardContainer.allInnerTexts();
        let actualProdTextList = JSON.stringify(lisOfCardProductsText);

        for(let prodName of productsNames){
            if(!actualProdTextList.includes(prodName)){
                return false;
            }
        }

       return true;
    }
}