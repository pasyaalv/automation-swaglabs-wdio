class loginPage {
    get usernameInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get loginButton() { return $('#login-button') }
    get errorMessage() { return $('.error-message-container') }

    async openUrl() {
        await browser.url('https://www.saucedemo.com/')
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        await this.errorMessage.getText();
    }
}

export default new loginPage()