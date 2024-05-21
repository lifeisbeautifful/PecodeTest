import {Page, Locator} from "@playwright/test"

export class Search{
    readonly page:Page;
    readonly searchField:Locator;

    constructor(page:Page){
        this.page = page;
    }

}