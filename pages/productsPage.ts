import {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "./BasePage";
import exp from "constants";

export class ProductsPage extends BasePage{
    private readonly sortByList:Locator;
    private readonly modalCardWindow:Locator;
    arePricesSorted:boolean;
    
    constructor(page:Page){
        super(page);
        this.sortByList = page.locator(".sort-by__select");
        this.modalCardWindow = page.locator(".v-modal__cmp cart-popup checkout_modal")
    }

    async sortProductsBy(sortOption:string){
        await this.sortByList.dblclick();
        await this.page.getByRole('listitem', { name: `${sortOption}` }).click();
    }

    async productsSortedByPrices():Promise<boolean>{
        let result = await this.page.locator("//div[@class='v-pb__cur discount']/span[@class='sum']").allInnerTexts();
       
        for(let start = 1; start < result.length; start++){
            if(result[start] < result[start-1]){
                this.arePricesSorted = false;
                return this.arePricesSorted;
            }
        }

        this.arePricesSorted = true;
        return this.arePricesSorted;
    }

    async addProductToCard(productID:string){
        await this.page.locator(`//div[@data-product-id=${productID}]/following::button[@title='Купити'][1]`).click();
        await this.page.getByRole("button", {name:"Продовжити вибір товарів"}).click();
        await expect(this.modalCardWindow).not.toBeVisible();
    }
}