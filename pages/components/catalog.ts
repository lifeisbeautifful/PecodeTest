import {Page, Locator} from "@playwright/test"

export class Catalog{
    readonly page:Page;
    readonly catalog:Locator;

    constructor(page:Page){
        this.page = page;
        this.catalog = page.locator("#js-menu-wrapper");
    }

    async selectCatalogItem(itemName:string){
        await this.catalog.getByText(itemName).click();
    }

    async selectSubcatalogItem(itemName:string, subItemName:string){
        let categoryItem = await this.catalog.getByText(itemName, {exact:true});
        await categoryItem.hover();
        await this.catalog.getByRole("link", {name:`${subItemName}`, exact:true}).click();
    }

}