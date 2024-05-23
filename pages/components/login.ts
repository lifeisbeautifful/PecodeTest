import {Locator, Page, expect} from "@playwright/test"

export class Login{
    readonly page:Page;
    readonly phoneField:Locator;
    readonly enterBtn:Locator;
    readonly loginPopup:Locator;

    constructor(page:Page){
        this.page=page;
        this.phoneField = page.locator("//input[@name='telephone']");
        this.enterBtn = page.locator("//button[@type='submit' and @class='a-button a-button--block a-button--lg a-button--primary']");
        this.loginPopup = page.locator("#customer-popup-menu");
    }

    async loginViaPhoneNumber(phoneNumber:string){
        await this.phoneField.fill(phoneNumber);
        await this.enterBtn.click();
        await expect(this.loginPopup).not.toBeVisible();
    }
}