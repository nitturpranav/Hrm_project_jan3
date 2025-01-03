import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../../pages/loginPage";
import { fixture } from "../../hooks/pageFixture";


let loginPage: LoginPage;
Given(`User navigates to the orange hrm application`, async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.navigateToLoginPage();
});
Then('User should see all components on the login page', async function () {
    // UserName field
    await loginPage.UserNameField();
    
    //Password field 
    await loginPage.PasswordField();

    //Login button
    await loginPage.validateLoginButton();

     //Default User Credentials
     await loginPage.defaultUserCredentials();

     //Forgot Password link

    await loginPage.validateForgotPasswordLink();

    //Social Media Links
    await loginPage.validateSocilaMediaLinks();

    //Orange HRM Logo
    await loginPage.validateOrangeHrmLogo();

    //Login Text

    await loginPage.validateLoginText();

    //Orange HRM For All logo
    await loginPage.validateOrangeHrmForAllLogo();

});

When ('User clicks on the social media links', async function () 
{
   await loginPage.clickOnSocialMediaLink();
})

When('User enters the valid credentials {string} and {string} and clicks on the login button', async function (username: string, password: string) {
    await loginPage.UserValidCredentials(username, password);
});

// Then('User should be navigated to the dashboard page', async function () {
//     // Await the result of verifyNavigationToDashboard() to get the success message
//     const successMessage = await loginPage.verifyNavigationToDashboard();
    
//     // Print the success message if returned
//     if (successMessage) {
//         console.log(successMessage);  // Should print "User navigated to the dashboard successfully"
//     } else {
//         console.error("Navigation to dashboard failed.");
//     }
// }); 

When("User clicks on the forgot password link", async function () {
    await loginPage.clickOnForgotPasswordLink();
});

Then('User should be navigated to the forgot password page', async function () {
    // Wait for the forgot password page to load
    await loginPage.verifyForgotPasswordPage();
});

Then('User should see the reset password link message after clicking the reset button', async function () {
    // Wait for the reset password page to load
    await loginPage.verifyResetPasswordPage();
});