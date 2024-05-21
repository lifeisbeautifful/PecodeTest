import {Locator, Page, expect} from "@playwright/test"
import { Catalog } from "./components/catalog";
import {Navigation} from "./components/navigation";
import{Card} from "./components/card";

export class BasePage{
    private readonly catalogBtn:Locator;
    readonly page:Page;
    readonly catalog:Catalog;
    readonly navigation:Navigation;
    readonly card:Card;
    readonly cardBtn:Locator;
    readonly searchField:Locator;
    readonly searchBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.catalogBtn = page.getByText("Каталог", {exact:true});
        this.catalog = new Catalog(page);
        this.navigation = new Navigation(page);
        this.card = new Card(page);
        this.cardBtn = page.getByLabel("Кошик");
        this.searchField = page.locator("[for='search-form__input']");
        this.searchBtn = page.locator("//button[@class='search-form__submit-button']");
    }

    async clickCatalogBtn(){
        await this.catalogBtn.click();
    }

    async clickCardBth(){
        await this.cardBtn.click();
        await expect(await this.card.cardContainer).toBeVisible();
    }

    async performSearch(searchData:string){
        await this.searchField.fill(searchData);
        await this.searchBtn.click();
        await this.page.waitForLoadState();
    }
}