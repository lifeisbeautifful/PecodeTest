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

    test.skip("Verify if the price filter working correctly", async({page}) => {
        let homePage = new HomePage(page);
        await homePage.clickCatalogBtn();
        await homePage.catalog.selectSubcatalogItem("Ноутбуки, ПК та планшети", "Ноутбуки");
    
        await homePage.navigation.enterMinPrice("4000");
        await homePage.navigation.enterMaxPrice("6000");
        await homePage.navigation.filterItemBy("action");
        await homePage.navigation.filterItemBy("discount");
        await page.waitForURL("https://allo.ua/ua/products/notebooks/action-da/discount-da/price_from-4000/price_to-6000/");
    
        let productsPage = new ProductsPage(page);
        await productsPage.sortProductsBy("від дешевих до дорогих");
        await page.waitForURL("https://allo.ua/ua/products/notebooks/action-da/dir-asc/discount-da/order-price/price_from-4000/price_to-6000/");
        
        await expect(await productsPage.productsSortedByPrices()).toBeTruthy();
    })

    test(" Add items to the basket", async({page}) => {
        let homePage = new HomePage(page);
        await homePage.clickCatalogBtn();
        await homePage.catalog.selectSubcatalogItem("Побутова техніка", "Роботи-пилососи");
        await page.waitForURL("https://allo.ua/ua/roboty-pylesosy/")

        let productsPage = new ProductsPage(page);
        await productsPage.addProductToCard("12844600");

        // await homePage.clickCatalogBtn();
        // await homePage.catalog.selectSubcatalogItem("Смартфони та телефони", "Смартфони");
        // await page.waitForURL("https://allo.ua/ua/products/mobile/klass-kommunikator_smartfon/")

        //await productsPage.addProductToCard("15973145");
        await productsPage.clickCardBth();

        //let productNamesInCardMatches = await productsPage.card.checkProductsInCardByName(["Робот-пилосос Rowenta X-Plorer Serie 75 S RR8567WH", "Apple iPhone 15 Pro Max 256GB Natural Titanium (MU793)"]);
        //await expect(productNamesInCardMatches).toBeTruthy();

        await productsPage.card.getTotalPrice("10 999 ₴");


        await page.pause();
        await homePage.catalog;


    })

    test("Search the item", async({page}) => {
        let homePage = new HomePage(page);
        await homePage.performSearch("Sony playstation 5")
    })
})