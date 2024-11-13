import {expect, $, browser} from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import productsPage from '../pageobjects/products.page.js'
import sidebarPage from '../pageobjects/sidebar.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Sidebar Testing - Swag Labs', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/')
        await loginPage.login('standard_user', 'secret_sauce')
    })
    it('Reset State', async () => {
        await cartPage.addProductToCart('sauce-labs-backpack')
        await browser.pause(2000)

        await sidebarPage.openSidebar()
        await sidebarPage.resetAppState()

        //Checking the products
        const count = await cartPage.cartQty
        const displayedCount = await count.isDisplayed() // Digunakan untuk menunggu hasil isDisplayed
        await expect(displayedCount).toBe(false)
        await browser.pause(2000)
    })
    it('Closing sidebar with touching outside sidebar menu', async () => {
        const out = await $('.app_logo')
        await out.click()
        const displayedOut = await out.isDisplayed() // Digunakan 
        await expect(displayedOut).toBe(true)
        // Fail
    })

    it('Logout', async () => {
        await sidebarPage.closeSidebar()
        await sidebarPage.openSidebar()
        await sidebarPage.logout()
        await browser.pause(2000)

        const login = await $('#login-button')
        const displayedLogin = await login.isDisplayed()
        await expect(displayedLogin).toBe(true)
        await browser.pause(2000)
    })
})