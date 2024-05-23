import {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "./BasePage";
import { Card } from "./components/card";

export class ProductsPage extends BasePage{
    private readonly sortByList:Locator;
    private readonly secondDisplayedProduct:Locator;
    private arePricesSorted:boolean;
    prodNamesAddedToCard:String[];
    
    constructor(page:Page){
        super(page);
        this.sortByList = page.locator(".sort-by__select");
        this.secondDisplayedProduct = page.locator("//div[@class='products-layout__container products-layout--grid']/child::div[2]//div[@class='product-card__content']/a");
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

    async addSecondProductToCard(){
        await this.secondDisplayedProduct.click();
        await this.page.waitForLoadState();

        let prodName = await this.page.locator("//h1[@class='p-view__header-title']").allTextContents();
        Card.listOfAddedProdNames.push(prodName[0]);

        let priceText = await this.page.locator("//div[@itemprop='offers']//span[@class='sum']").allInnerTexts();
        let priceNumber = parseInt(priceText[0].slice(0, priceText[0].length-1).split(' ').join(''));
        Card.sumOfAddedProdPrices += priceNumber;

        await this.card.buyBtn.click();
        await this.card.returnLink.click();
    }
}