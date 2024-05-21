import {Locator, Page} from "@playwright/test"
import dotenv from "dotenv"
import { BasePage } from "./BasePage";
dotenv.config()

export class HomePage extends BasePage{

    constructor(page:Page){
        super(page);
    }

}