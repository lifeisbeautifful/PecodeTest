import {Locator, Page, expect} from "@playwright/test"
import { Catalog } from "./components/catalog";
import {Navigation} from "./components/navigation";
import{Card} from "./components/card";
import{Login} from "./components/login"

export class BasePage{
    private readonly catalogBtn:Locator;
    private readonly cardBtn:Locator;
    private readonly searchField:Locator;
    private readonly searchBtn:Locator;
    private readonly accountBtn:Locator;
    readonly page:Page;
    readonly catalog:Catalog;
    readonly navigation:Navigation;
    readonly card:Card;
    readonly login:Login;
    

    constructor(page:Page){
        this.page = page;
        this.catalog = new Catalog(page);
        this.navigation = new Navigation(page);
        this.card = new Card(page);
        this.login = new Login(page);
        this.catalogBtn = page.locator("//div[@class='ct-button']");
        this.cardBtn = page.locator("//div[@class='mh-cart']/button");
        this.searchField = page.locator("[for='search-form__input']");
        this.searchBtn = page.locator("//button[@class='search-form__submit-button']");
        this.accountBtn = page.locator("//div[@class='mh-profile']//button");
    }

    async clickCatalogBtn(){
        await this.catalogBtn.click();
    }

    async clickCardBth(){
        await this.cardBtn.click();
        await expect(this.card.cardContainer).toBeVisible();
    }

    async performSearch(searchData:string){
        await this.searchField.fill(searchData);
        await this.searchBtn.click();
        await this.page.waitForLoadState();
    }

    async clickAccountBtn(){
        await this.accountBtn.click();
    }
}