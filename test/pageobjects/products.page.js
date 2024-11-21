class productsPage {
    get productTitle() { return $('.title'); }
    get sortDropdown() { return $('.product_sort_container'); }
    get productImages() { return $$('img.inventory_item_img'); }
    get productNames() { return $('.inventory_item_name'); }
    get productItem() {return $('.inventory_item')}
    get detailsName() {return $('.inventory_details_name')}
    get detailsPrice() {return $('.inventory_details_price')}
    get backButton() {return $('#back-to-products')}
    
    async urlProducts() {
        await browser.url('https://www.saucedemo.com/inventory.html')
    }

    async validateProductImages(value) {
        const image = await this.productImages
        for(const img of image){
            const src = await img.getAttribute('src')
            if (src !== value){
                throw new Error(`Expected src to be ${value} but got ${src}}`)
            }
        }
    }
    
    async sortProduct(value) {
        await this.sortDropdown.click()
        await this.sortDropdown.selectByAttribute('value', value)
    }
    
    async selectProduct(item) {
        const product = await $(`//*[contains(text(), '${item}')]`);
        await product.scrollIntoView
        await product.click()
    }

    async backToProducts() {
        await this.backButton.click()
    }
}

export default new productsPage()
