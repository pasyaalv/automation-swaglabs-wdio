import {expect, $, browser} from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productsPage from '../pageobjects/products.page.js'

describe('Login Page - Swag Labs', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/')
    })
    describe('1. standard_user', () => {
        it('Login with valid credentials', async () => {
            await loginPage.login('standard_user', 'secret_sauce')     
            const title = await productsPage.productTitle
            await title.getText()
            await expect(title).toHaveText('Products')
            await browser.pause(2000)
        })
        
        it('Login with invalid password', async () => {
            await loginPage.login('standard_user', 'standard_user')    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('2. locked_out_user', () => {
        it('Login with valid credentials', async () => {
            await loginPage.login('locked_out_user', 'secret_sauce')
            await browser.pause(2000)     
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
        })
        
        it('Login with invalid password', async () => {
            await loginPage.login('locked_out_user', 'locked_out_user')    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('3. problem_user', () => {
        it('Login with valid credentials', async () => {
            await loginPage.login('problem_user', 'secret_sauce')     
            const title = await productsPage.productTitle
            await title.getText()
            await expect(title).toHaveText('Products')

            // Check if the picture turns into a dog picture
            const productImages = await productsPage.productImages
            for (const img of productImages){
                const src = await img.getAttribute('src')
                expect(src).toEqual('/static/media/sl-404.168b1cce.jpg')
            }

            // Check if the navigation to the product detail page is correct
            await productsPage.detailsProduct('Sauce Labs Backpack')
            const productTitle = $('.inventory_details_name ')
            await productTitle.getText()
            await expect(productTitle).toHaveText('Sauce Labs Backpack')
            await browser.pause(2000)
        })
        
        it('Login with invalid password', async () => {
            await loginPage.login('problem_user', 'problem_user')    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('4. error_user', () => {
        it('Login with valid credentials', async () => {
            await loginPage.login('error_user', 'secret_sauce')     
            const title = await productsPage.productTitle
            await title.getText()
            await expect(title).toHaveText('Products')
            await browser.pause(2000)

            // Check the sorting button if it's working
            const sort = await productsPage.sortDropdown
            await sort.click()
            await sort.selectByIndex(2);
            await browser.pause(5000)
            const alert = browser.getAlertText()
            await expect(alert).toEqual('Sorting is broken! This error has been reported to Backtrace.')
            await browser.pause(2000)
        })
        
        it('Login with invalid password', async () => {
            await loginPage.login('error_user', 'error_user')    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('5. Negative test case', () => {
        it('Login with invalid credentials', async () => {
            await loginPage.login('invalid_user', 'invalid_password')
            await browser.pause(2000)     
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
        
        it('Login with empty credentials', async () => {
            await loginPage.login('', '')    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username is required')
        })

        it('Login with ideal maximum character', async () => {
            const maxChar = 'x'.repeat(50)
            await loginPage.login(maxChar, maxChar)    
            await browser.pause(2000)
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
})