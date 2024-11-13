import {expect, $, browser} from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productsPage from '../pageobjects/products.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Cart Page - Swag Labs', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/')
        await loginPage.login('standard_user', 'secret_sauce')
    })
    describe('Verify functionality Add to Cart & Remove Item - Products Page', async () => {
        it('Adding First Item', async () => {
            await cartPage.addProductToCart('sauce-labs-backpack')
            await browser.pause(2000)

            //Checking the products
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(1)
        })
        it('Adding Second Item [Last Products]', async () => {
            const addToCart = await $('//*[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]')
            await addToCart.click()
            await browser.pause(2000)

            //Checking the products
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(2)
        })
        it('Adding Third Item', async () => {
            await cartPage.addProductToCart('sauce-labs-bolt-t-shirt')
            await browser.pause(2000)

            //Checking the products
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(3)
        })
        it('Adding Fourth Item and Removing Third Item', async () => {
            await cartPage.addProductToCart('sauce-labs-fleece-jacket')
            await browser.pause(2000)

            //Checking the products
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(4)
        })
        it('Removing Third Item', async () => {
            //Deleting third item
            await cartPage.removeProductFromCart('sauce-labs-bolt-t-shirt')
            await browser.pause(2000)

            //Checking on the Cart
            await cartPage.openCart()
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(3)
        })
        it('Removing Second and Last Item at the Cart Page', async () => {
            //Deleting third item
            const remove = await $('//*[@id="remove-test.allthethings()-t-shirt-(red)"]')
            await remove.click()
            await browser.pause(1000)
            await cartPage.removeProductFromCart('sauce-labs-fleece-jacket')
            await browser.pause(1000)
            await browser.pause(2000)

            //Checking on the Cart
            const count = await cartPage.cartQty
            await count.getText()
            expect(count).toHaveText(1)
        })
    })
    describe('Verify functionality - Checkout', () => {
        it('Checkout Button Functionality', async () => {
            await browser.pause(2000)
            const qty = await cartPage.qtyTotal
            await qty.getText()
            expect(qty).toHaveText(1)

            await cartPage.proceedToCheckout()
            await browser.pause(2000)
        })
        it('Cancel Button at Checkout', async () => {
            // Canceling at Checkout Page
            await cartPage.cancelCheckout()
            await browser.pause(200)
            
            // Cancel at Cart Page / Continue Shopping
            await cartPage.continueShopping()
            await browser.pause(2000)
            await cartPage.openCart()
            await browser.pause(2000)

            const qty = await cartPage.qtyTotal
            const name = await $('.inventory_item_name')
            await qty.getText()
            await name.getText()
            expect(qty).toHaveText(1)
            expect(name).toHaveText('Sauce Labs Backpack')

            await cartPage.proceedToCheckout()
        })
        it('Filling all input field with empty information', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Your Information')
            await browser.pause(2000)

            // Filling input field
            await cartPage.checkoutInformation('', '', '')
            const error = await cartPage.getErrorMessage()
            expect(error).toHaveText('Error: First Name is required')
            await browser.pause(2000)
        })
        it('Filling all input field with Last Name Empty', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Your Information')
            await browser.pause(2000)

            // Filling input field
            await cartPage.checkoutInformation('pasya', '', '123456')
            const error = await cartPage.getErrorMessage()
            expect(error).toHaveText('Error: First Name is required')
            await browser.pause(2000)
        })
        it('Filling all input field with First Name Empty', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Your Information')
            await browser.pause(2000)

            // Filling input field
            await cartPage.checkoutInformation('', 'alvan', '123456')
            const error = await cartPage.getErrorMessage()
            expect(error).toHaveText('Error: First Name is required')
            await browser.pause(2000)
        })
        it('Filling all input field with Postal Code Empty', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Your Information')
            await browser.pause(2000)

            // Filling input field
            await cartPage.checkoutInformation('pasya', 'alvan', '')
            const error = await cartPage.getErrorMessage()
            expect(error).toHaveText('Error: First Name is required')
            await browser.pause(2000)
        })
        it('Filling all input fields', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Your Information')
            await browser.pause(2000)

            // Filling input field
            await cartPage.checkoutInformation('pasya', 'alvan', '123456')
            
            const title = await $('.title')
            await title.getText()
            expect(title).toHaveText('Checkout: Overview')
            await browser.pause(2000)
        })
        it('Final Overview Checkout', async () => {
            const checkOutPage = await $('.title')
            await expect(checkOutPage).toHaveText('Checkout: Overview')
            await browser.pause(2000)

            // Assertion Final Product
            const finalProductName = await productsPage.productNames
            await finalProductName.getText()
            await expect(finalProductName).toHaveText('Sauce Labs Backpack')
            
            const finalProductQty = await cartPage.qtyTotal
            await finalProductQty.getText()
            await expect(finalProductQty).toHaveText("1")
            
            const finalProductPrice = await $('.summary_subtotal_label')
            await finalProductPrice.getText()
            await expect(finalProductPrice).toHaveText('Item total: $29.99')

            const finishCO = await $('#finish')
            await finishCO.click()
            await browser.pause(3000)
        })
        it('Order Complete', async () => {
            const complete = await $('.complete-header')
            const pageTitle = await $('.title')
            await complete.getText()
            await pageTitle.getText()
            await expect(pageTitle).toHaveText('Checkout: Complete!')
            
            await expect(complete).toHaveText('Thank you for your order!')

            // Back to Products
            const productsButton = await $('#back-to-products')
            await productsButton.click()
        })
    })
})