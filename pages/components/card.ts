import {Locator, Page, expect} from "@playwright/test"

export class Card{
    static listOfAddedProdNames:String[] = [];
    static sumOfAddedProdPrices = 0;
    readonly actualprodNames:String[] = [];
    readonly page:Page;
    readonly cardContainer:Locator;
    readonly buyBtn:Locator;
    readonly returnLink:Locator;
    readonly actualProdTitles:Locator;
    readonly totalPrice:Locator;
    readonly removeItemBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.cardContainer = page.locator("//ul[@class='products__list']");
        this.buyBtn = this.page.locator("#product-buy-button");
        this.returnLink = this.page.locator(".comeback");
        this.actualProdTitles = this.page.locator("//div[@class='title']//p[@class='text']");
        this.totalPrice = this.page.locator(".total-box__price");
        this.removeItemBtn = this.page.locator("//div[@class='title'][1]/*[@class='vi i-shared vi__close remove']");
    }

    async actualTotalPriceIsCorrect():Promise<boolean>{
        let textTotalPrice = await this.totalPrice.allTextContents();
        let totalPriceInDigigts = textTotalPrice[0].slice(0, textTotalPrice[0].length-1).split(' ').join('').replace(/\D/g, "");
        return parseInt(totalPriceInDigigts) === Card.sumOfAddedProdPrices;
    }

    async checkProductsInCardByName():Promise<boolean>{
        let productsNames = await this.actualProdTitles.all();

        for(let start = 0; start< productsNames.length; start++){
            let prodName = await productsNames[start].allInnerTexts();
            this.actualprodNames.push(prodName[0]);
        }

        return JSON.stringify(this.actualprodNames) === JSON.stringify(Card.listOfAddedProdNames);
    }

    async removeBtnIsClickable(){
        await expect(this.removeItemBtn.first()).toBeEnabled();
    }
}