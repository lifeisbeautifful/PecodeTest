import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/homePage"
import dotenv from "dotenv"
import { ProductsPage } from "../pages/productsPage"
dotenv.config()

test.describe("Allo smoke test task", () => {
    test.beforeEach("Open and verify marketplace url", async({page}) => {
        await page.goto("https://allo.ua/");
        await expect(page).toHaveURL(String(process.env.BASE_URL));
    })

    // test("Verify if the price filter working correctly @shouldPass", async({page}) => {
    //     try{
    //         let homePage = new HomePage(page);
    //         await homePage.clickCatalogBtn();
    //         await homePage.catalog.selectSubcatalogItem("Ноутбуки, ПК та планшети", "Ноутбуки");
    
    //         await homePage.navigation.enterMinPrice("4000");
    //         await homePage.navigation.enterMaxPrice("6000");
    //         await homePage.navigation.filterItemBy("action");
    //         await homePage.navigation.filterItemBy("discount");
    //         await page.waitForURL("https://allo.ua/ua/products/notebooks/action-da/discount-da/price_from-4000/price_to-6000/");
    
    //         let productsPage = new ProductsPage(page);
    //         await productsPage.sortProductsBy("від дешевих до дорогих");
    //         await page.waitForURL("https://allo.ua/ua/products/notebooks/action-da/dir-asc/discount-da/order-price/price_from-4000/price_to-6000/");
        
    //         expect(await productsPage.productsSortedByPrices()).toBeTruthy();
    //     }
    //     finally{
    //         await page.close();
    //     }
    // })

    test(" Add items to the basket @shouldPass", async({page}) => {
        console.log("Test");
        // try{
        //     let homePage = new HomePage(page);
        //     await homePage.clickCatalogBtn();
        //     await homePage.catalog.selectSubcatalogItem("Побутова техніка", "Роботи-пилососи");
        //     await page.waitForURL("https://allo.ua/ua/roboty-pylesosy/");

        //     let productsPage = new ProductsPage(page);
        //     await productsPage.addSecondProductToCard();

        //     await homePage.clickCatalogBtn();
        //     await homePage.catalog.selectSubcatalogItem("Смартфони та телефони", "Смартфони");
        //     await page.waitForURL("https://allo.ua/ua/products/mobile/klass-kommunikator_smartfon/")

        //     await productsPage.addSecondProductToCard();
        //     await productsPage.clickCardBth();
        
        //     let productNamesInCardMatches = await productsPage.card.checkProductsInCardByName();
        //     expect(productNamesInCardMatches).toBeTruthy();

        //     let totalPriceIsCorrect = await productsPage.card.actualTotalPriceIsCorrect();
        //     expect(totalPriceIsCorrect).toBeTruthy();

        //     await productsPage.card.removeBtnIsClickable();
        // }
        // finally{
        //     await page.close()
        // }
    })

    // test("Search the item @shouldPass", async({page}) => {
    //     try{
    //         let homePage = new HomePage(page);
    //         await homePage.performSearch("Sony playstation 5");
    //         await page.waitForLoadState();
    //         await expect(page).toHaveScreenshot("Sony playstation 5 search result.png");
    //     }
    //     finally{
    //         await page.close();
    //     };
    // })

    // test("Login using email and password @shouldFail", async({page}) => {
    //     try{
    //         let homePage = new HomePage(page);
    //         await homePage.clickAccountBtn();
    //         await homePage.login.loginViaPhoneNumber("0982622672");
    //     }
    //     finally{
    //         await page.close();
    //     }
    // })
})
