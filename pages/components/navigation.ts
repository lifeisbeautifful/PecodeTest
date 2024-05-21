import {Locator, Page} from "@playwright/test"

export class Navigation{
    readonly page:Page;
    private readonly navigationFilter:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.navigationFilter = page.locator(".v-catalog__navigation");
    }

    async filterItemBy(filter:string){
        await this.navigationFilter.locator(`[data-id=${filter}]`).click();
    }

    async enterMinPrice(price:string){
        await this.page.locator("//form[@class='f-range__form']/input[1]").fill(price);
    }

    async enterMaxPrice(price:string){
        await this.page.locator("//form[@class='f-range__form']/input[2]").fill(price);
    }

}