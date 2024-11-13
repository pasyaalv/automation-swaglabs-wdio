class cartPage {
    get cartItems() { return $$('.cart_item') }
    get cartIcon() { return $('.shopping_cart_link') }
    get checkoutButton() { return $('#checkout') }
    get removeButton() { return $$('.cart_button') }
    get cartQty() { return $('.shopping_cart_badge')}
    get qtyTotal() { return $('.cart_quantity')}
    get cancelCO() { return $('#cancel')}
    get continueShop() { return $('#continue-shopping')}
    
    get firstNameCO() { return $('#first-name')}
    get lastNameCO() { return $('#last-name')}
    get zipcodeCO() { return $('#postal-code')}
    get continueCO() {return $('#continue')}
    get errorMessage() { return $('.error-message-container') }

    async addProductToCart(item) {
        const product = await $(`#add-to-cart-${item}`);
        await product.scrollIntoView
        await product.click()
    }
    async removeProductFromCart(item) {
        const product = await $(`#remove-${item}`);
        await product.scrollIntoView
        await product.click()
    }

    async countProduct() {
        return this.cartItems.length
    }

    async openCart() {
        await this.cartIcon.click()
    }
    async continueShopping() {
        await this.continueShop.click()
    }

    async cancelCheckout() {
        await this.cancelCO.click()
    }
    async proceedToCheckout() {
        await this.checkoutButton.click()
    }

    async checkoutInformation(first, last, zip) {
        await this.firstNameCO.setValue(first);
        await this.lastNameCO.setValue(last);
        await this.zipcodeCO.setValue(zip);
        await this.continueCO.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }
}

export default new cartPage()