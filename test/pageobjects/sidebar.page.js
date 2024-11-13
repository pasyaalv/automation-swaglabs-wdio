class sidebarPage {
    get sidebarButton() { return $('#react-burger-menu-btn') }
    get logoutButton() { return $('//*[@id="logout_sidebar_link"]') }
    get resetButton() { return $('#reset_sidebar_link') }
    get closeButton() { return $('#react-burger-cross-btn')}

    async closeSidebar() {
        await this.closeButton.click()
    }
    
    async openSidebar() {
        await this.sidebarButton.click()
    }

    async logout() {
        await this.logoutButton.click()
    }

    async resetAppState() {
        await this.resetButton.click()
    }
}

export default new sidebarPage()