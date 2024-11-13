import {expect, $, browser} from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productsPage from '../pageobjects/products.page.js'

describe('Products Page - Swag Labs', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/')
        await loginPage.login('standard_user', 'secret_sauce')
    })
    describe('Verify functionality sorting dropdown', () => {
        it('Sort products in Alphabetical Order [Z-A]', async () => {
            await productsPage.sortProduct('za')

            // Assertion first item
            const firstProductsName = await $('.inventory_item_name:nth-child(1)')
            await firstProductsName.getText()
            await expect(firstProductsName).toHaveText('Test.allTheThings() T-Shirt (Red)')
            await browser.pause(2000)
        })
        it('Sort products in Alphabetical Order [A-Z]', async () => {
            await productsPage.sortProduct('az')

            // Assertion first item
            const firstProductsName = await $('.inventory_item_name:nth-child(1)')
            await firstProductsName.getText()
            await expect(firstProductsName).toHaveText('Sauce Labs Backpack')
            await browser.pause(2000)
        })
        it('Sort products in Ascending Price [Low to High]', async () => {
            await productsPage.sortProduct('lohi')

            // Assertion first item
            const firstProductPrice = await $('.inventory_item_price:nth-child(1)')
            await firstProductPrice.getText()
            await expect(firstProductPrice).toHaveText('$7.99')
            await browser.pause(2000)
        })
        it('Sort products in Descending Price [High to Low]', async () => {
            await productsPage.sortProduct('hilo')

            // Assertion first item
            const firstProductPrice = await $('.inventory_item_price:nth-child(1)')
            await firstProductPrice.getText()
            await expect(firstProductPrice).toHaveText('$49.99')
            await browser.pause(2000)
        })
    })
    describe('Verify functionality Product Details', () => {
        it('Product Details Sauce Labs Fleece Jacket', async () => {
            await productsPage.selectProduct('Sauce Labs Fleece Jacket')

            const detailsName = await productsPage.detailsName
            await detailsName.getText()
            const detailsPrice = await productsPage.detailsPrice
            await detailsPrice.getText()

            await expect(detailsName).toHaveText('Sauce Labs Fleece Jacket')
            await expect(detailsPrice).toHaveText('$49.99')
            await browser.pause(2000)
        })
        it('Product Details Sauce Labs Backpack', async () => {
            await productsPage.backToProducts()
            await browser.pause(2000)
            await productsPage.selectProduct('Sauce Labs Backpack')

            const detailsName = await productsPage.detailsName
            await detailsName.getText()
            const detailsPrice = await productsPage.detailsPrice
            await detailsPrice.getText()

            await expect(detailsName).toHaveText('Sauce Labs Backpack')
            await expect(detailsPrice).toHaveText('$29.99')
            await browser.pause(2000)
        })
        it('Product Details Sauce Labs Onesie', async () => {
            await productsPage.backToProducts()
            await browser.pause(2000)
            await productsPage.selectProduct('Sauce Labs Onesie')

            const detailsName = await productsPage.detailsName
            await detailsName.getText()
            const detailsPrice = await productsPage.detailsPrice
            await detailsPrice.getText()

            await expect(detailsName).toHaveText('Sauce Labs Onesie')
            await expect(detailsPrice).toHaveText('$7.99')
            await browser.pause(2000)
        })
        it('Product Details Sauce Labs Bike Light', async () => {
            await productsPage.backToProducts()
            await browser.pause(2000)
            await productsPage.selectProduct('Sauce Labs Bike Light')

            const detailsName = await productsPage.detailsName
            await detailsName.getText()
            const detailsPrice = await productsPage.detailsPrice
            await detailsPrice.getText()

            await expect(detailsName).toHaveText('Sauce Labs Bike Light')
            await expect(detailsPrice).toHaveText('$9.99')
            await browser.pause(2000)
        })
    })
})