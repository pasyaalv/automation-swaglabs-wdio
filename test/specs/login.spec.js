import {expect, $, browser} from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productsPage from '../pageobjects/products.page.js'

describe('Login Page - Swag Labs', () => {
    beforeEach(async () => {
        await loginPage.openUrl()
    })
    describe('1. standard_user', () => {
        it('LOG-001 : Login with valid credentials', async () => {
            await loginPage.login('standard_user', 'secret_sauce') 

            const title = await productsPage.productTitle
            await title.getText()

            await expect(title).toHaveText('Products')
        })
        
        it('LOG-002 : Login with invalid password', async () => {
            await loginPage.login('standard_user', 'standard_user')    

            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('2. locked_out_user', () => {
        it('LOG-003 : Login with valid credentials', async () => {
            await loginPage.login('locked_out_user', 'secret_sauce')

            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
        })
        
        it('LOG-004 : Login with invalid password', async () => {
            await loginPage.login('locked_out_user', 'locked_out_user')    
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('3. problem_user', () => {
        it('LOG-005 : Login with valid credentials', async () => {
            await loginPage.login('problem_user', 'secret_sauce')     

            const title = await productsPage.productTitle
            await title.getText()

            await expect(title).toHaveText('Products')

            // Check if the picture turns into a dog picture
            await productsPage.validateProductImages('/static/media/sl-404.168b1cce.jpg')
        })
        
        it('LOG-006 : Login with invalid password', async () => {
            await loginPage.login('problem_user', 'problem_user')    
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()
            
            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe.only('4. error_user', () => {
        it('LOG-007 : Login with valid credentials', async () => {
            await loginPage.login('error_user', 'secret_sauce')
            
            const title = await productsPage.productTitle
            await title.getText()
            
            await expect(title).toHaveText('Products')
            

            // Check the sorting button if it's working
            await productsPage.sortProduct('za')
            try{
                const errorLogs = await browser.getAlertText()
                console.log(errorLogs)
                expect(errorLogs).toHaveText('Sorting is broken! This error has been reported to Backtrace.')
                await browser.acceptAlert()
            } catch (err) {
                console.error('No Alert Appeared')
                throw new Error("Expected Alert did'nt appear")
            }
        })
        
        it('LOG-008 : Login with invalid password', async () => {
            await loginPage.login('error_user', 'error_user')    
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    describe('5. Negative test case', () => {
        it('LOG-009 : Login with invalid credentials', async () => {
            await loginPage.login('invalid_user', 'invalid_password')
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
        
        it('LOG-010 : Login with empty credentials', async () => {
            await loginPage.login('', '')    
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Username is required')
        })

        it('LOG-011 : Login with ideal maximum character', async () => {
            // Masukan karakter dengan panjang 50 karakter
            const maxChar = 'x'.repeat(50)
            await loginPage.login(maxChar, maxChar)    
            
            const errorMessage = await loginPage.errorMessage
            await errorMessage.getText()

            await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        })
    })
    afterEach(async () => {
        await browser.pause(2000)
    })
})