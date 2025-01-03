import { expect, Page, Browser, chromium } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }




    async navigateToLoginPage() {
        await fixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        fixture.page.waitForTimeout(10000);

    }

    async UserNameField() {
        const userNameLabel = fixture.page.locator(`//label[text()="Username"]`);
        await expect(userNameLabel).toBeVisible();
        const userNameField = fixture.page.locator(`//input[@name="username"]`);
        await expect(userNameField).toBeVisible();
    }

    async defaultUserCredentials() {
        const defaultUserCredentials = fixture.page.locator(`//p[text()="Username : Admin"]`);
        await expect(defaultUserCredentials).toBeVisible();
        const defaultUserCredentialsPassword = fixture.page.locator(`//p[text()="Password : admin123"]`);
        await expect(defaultUserCredentialsPassword).toBeVisible();
    }

    async PasswordField() {
        const passwordLabel = fixture.page.locator(`//label[text()="Password"]`);
        await expect(passwordLabel).toBeVisible();
        const passwordField = fixture.page.locator(`//input[@name="password"]`);
        await expect(passwordField).toBeVisible();
    }

    async validateLoginButton() {
        const loginButton = fixture.page.locator(`//button[text()=" Login "]`);
        await expect(loginButton).toBeVisible();
        const color = await loginButton.evaluate((element) => {
            return element.ownerDocument.defaultView.getComputedStyle(element).backgroundColor;
        });
        expect(color).toBe("rgb(255, 123, 29)"); // RGB value for orange
    }

    async validateForgotPasswordLink() {
        const forgotPasswordLink = fixture.page.locator(`//p[text()="Forgot your password? "]`);
        await expect(forgotPasswordLink).toBeVisible();
    }

    async validateSocilaMediaLinks() {
        const linkedInLink = fixture.page.locator(`//a[@href="https://www.linkedin.com/company/orangehrm/mycompany/"]`);
        await expect(linkedInLink).toBeVisible();
        const faceBookLink = fixture.page.locator(`//a[@href="https://www.facebook.com/OrangeHRM/"]`);
        await expect(faceBookLink).toBeVisible();
        const twitterLink = fixture.page.locator(`//a[@href="https://twitter.com/orangehrm?lang=en"]`);
        await expect(twitterLink).toBeVisible();
        const youtubeLink = fixture.page.locator(`//a[@href="https://www.youtube.com/c/OrangeHRMInc"]`);
        await expect(youtubeLink).toBeVisible();

    }

    async validateOrangeHrmLogo() {
        const orangeHrmLogo = fixture.page.locator(`//img[@alt="company-branding"]`);
        await expect(orangeHrmLogo).toBeVisible();
    }

    async validateLoginText() {
        const loginText = fixture.page.locator("//h5[text()='Login']");
        await expect(loginText).toBeVisible();
    }
    async validateOrangeHrmForAllLogo() {
        await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async clickOnSocialMediaLink() {

        //linkedin page validation
        const linkedInLink = fixture.page.locator(`//a[@href="https://www.linkedin.com/company/orangehrm/mycompany/"]`);

        // Wait for the new tab to open and get its page object
        const [newPage1] = await Promise.all([
            fixture.page.context().waitForEvent('page'), // Wait for the new page to open
            linkedInLink.click() // Click the link to open the new tab
        ]);

        // Wait for the new page to fully load
        await newPage1.waitForLoadState('load');

        // Verify the URL of the new page
        await expect(newPage1).toHaveURL("chrome-error://chromewebdata/");
        await newPage1.close();


        //facebook page validation
        const faceBookLink = fixture.page.locator(`//a[@href="https://www.facebook.com/OrangeHRM/"]`);
        const [newPage2] = await Promise.all([
            fixture.page.context().waitForEvent('page'), // Wait for the new page to open
            faceBookLink.click() // Click the link to open the new tab
        ]);

        // Wait for the new page to fully load
        await newPage1.waitForLoadState('load');

        await expect(newPage2).toHaveURL("chrome-error://chromewebdata/");
        await newPage2.close();

        //twitter page validation

        const twitterLink = fixture.page.locator(`//a[@href="https://twitter.com/orangehrm?lang=en"]`);
        const [newPage3] = await Promise.all([
            fixture.page.context().waitForEvent('page'), // Wait for the new page to open
            twitterLink.click() // Click the link to open the new tab
        ]);

        // Wait for the new page to fully load
        await newPage3.waitForLoadState('load');

        await expect(newPage3).toHaveURL("chrome-error://chromewebdata/");
        await newPage3.close();

        //youtube page validation
        const youtubeLink = fixture.page.locator(`//a[@href="https://www.youtube.com/c/OrangeHRMInc"]`);
        const [newPage4] = await Promise.all([
            fixture.page.context().waitForEvent('page'), // Wait for the new page to open
            youtubeLink.click() // Click the link to open the new tab
        ]);

        // Wait for the new page to fully load
        await newPage4.waitForLoadState('load');

        await expect(newPage4).toHaveURL("chrome-error://chromewebdata/");
        await newPage4.close();
}
    async UserValidCredentials(username: string, password: string) {
        const userNameField = fixture.page.locator(`//input[@name="username"]`);
        await userNameField.fill(username);
        const passwordField = fixture.page.locator(`//input[@name="password"]`);
        await passwordField.fill(password);
        const loginButton = fixture.page.locator(`//button[text()=" Login "]`);
        await loginButton.click();

        // Check for invalid credentials message if not using valid ones
        const errorMessage = fixture.page.locator(`//p[text()='Invalid credentials']`);
        try {
            await expect(errorMessage).toBeVisible({ timeout: 1000 });
            // If error message is visible, fail the test or log the error
            console.log("Invalid credentials");
        } catch (error) {
            // If no error message, validate the successful login (i.e., verify dashboard)
            await this.verifyNavigationToDashboard();
        }
    }

    // Function to verify navigation to the dashboard
    async verifyNavigationToDashboard() {
        // Wait for the dashboard element to be visible, indicating successful navigation
        const dashboardText = fixture.page.locator(`//h6[text()="Dashboard"]`);
        await expect(dashboardText).toBeVisible();

        // Verify if the profile icon is also visible, confirming successful login
        const profile = fixture.page.locator(`//span[@class='oxd-userdropdown-tab']`);
        await expect(profile).toBeVisible();
        await profile.click();
        const about = fixture.page.locator(`//a[text()='About']`);
        await expect(about).toBeVisible();
        const support = fixture.page.locator(`//a[text()='Support']`);
        await expect(support).toBeVisible();
        const changePassword = fixture.page.locator(`//a[text()='Change Password']`);
        await expect(changePassword).toBeVisible();
        const logout = fixture.page.locator(`//a[text()='Logout']`);
        await expect(logout).toBeVisible();
        return "User navigated to the dashboard successfully";

    }

    async clickOnForgotPasswordLink() {
        const forgotPasswordLink = fixture.page.locator(`//p[text()="Forgot your password? "]`);
        await expect(forgotPasswordLink).toBeVisible();
        await forgotPasswordLink.click();
    }
    async verifyForgotPasswordPage() {
        const resetPasswordText = fixture.page.locator(`//h6[text()="Reset Password"]`);
        await expect(resetPasswordText).toBeVisible();

        const resetPasswordInstruction = fixture.page.locator(`//p[text()='Please enter your username to identify your account to reset your password']`);
        await expect(resetPasswordInstruction).toBeVisible();

        const userNameLabel = fixture.page.locator(`//label[text()="Username"]`);
        await expect(userNameLabel).toBeVisible();

        const userNameField = fixture.page.locator(`//input[@name="username"]`);
        await expect(userNameField).toBeVisible();

        const cancelButton = fixture.page.locator(`//button[text()=' Cancel ']`);
        await expect(cancelButton).toBeVisible();

        const resetButton = fixture.page.locator(`//button[text()=' Reset Password ']`);
        await expect(resetButton).toBeVisible();



    }

    async verifyResetPasswordPage() {
        // Locate the "Cancel" button and click it
        const cancelButton = fixture.page.locator(`//button[text()=' Cancel ']`);
        await expect(cancelButton).toBeVisible();

        if (await cancelButton.isVisible()) {
            await cancelButton.click();

            // Verify that the user is redirected to the login page
            await expect(fixture.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        }
        await this.clickOnForgotPasswordLink();

        const userNameField = fixture.page.locator(`//input[@name="username"]`);

        // Ensure the username field is visible
        await expect(userNameField).toBeVisible();

        // Fill the username field
        await userNameField.fill("Admin");



        // Retrieve the value from the username field to verify it
        const usernameValue = await userNameField.inputValue();

        if (usernameValue === "Admin") {
            // If the username is correct, proceed with resetting the password

            console.log("Username is correct");

            // Locate and click on the "Reset Password" button
            const resetButton = fixture.page.locator(`//button[text()=' Reset Password ']`);
            await expect(resetButton).toBeVisible();
            await resetButton.click();

            // Verify the success message after reset password link is sent
            const resetPasswordMessage = fixture.page.locator(`//h6[text()="Reset Password link sent successfully"]`);
            await expect(resetPasswordMessage).toBeVisible();

            // Verify reset password instructions
            const resetPasswordInstruction1 = fixture.page.locator(`//p[text()="A reset password link has been sent to you via email."]`);
            await expect(resetPasswordInstruction1).toBeVisible();

            const resetPasswordInstruction2 = fixture.page.locator(`//p[text()="You can follow that link and select a new password."]`);
            await expect(resetPasswordInstruction2).toBeVisible();

            // Verify the note about email delivery failure
            const noteTitle = fixture.page.locator(`//p[text()="Note: "]`);
            await expect(noteTitle).toBeVisible();

            const noteInstruction = fixture.page.locator(`//p[text()="If the email does not arrive, please contact your OrangeHRM Administrator."]`);
            await expect(noteInstruction).toBeVisible();
        } else {
            // If the username is incorrect, print the message
            console.log("Username is incorrect");
        }



    }


}