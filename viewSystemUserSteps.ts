import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import ViewSystemUserPage from "../../pages/viewSystemUserPage";

let viewSystemUserPage: ViewSystemUserPage;


Given(`User navigates to the orange hrm application, logs in, and is present on the view system users page`, async function () {
viewSystemUserPage = new ViewSystemUserPage(fixture.page);
    await viewSystemUserPage.navigateToMainPage();
});
Then('User can see all the components on the view system users page', async function () 
{
    //Dashboard
    await viewSystemUserPage.validateDashboard();

    //Profile
    await viewSystemUserPage.validateProfile();
    
    //Upgrade Button
    await viewSystemUserPage.validateUpgradeButton();
    
    //validating all left panel components
    await viewSystemUserPage.validateLeftPanelComponents();
});

When("the user clicks on the {string} button",async function (buttonName: string) {
    await viewSystemUserPage.leaveButton(buttonName);
});

Then("the user should be able to view all the components within the Leave tab.", async function () {
    //Leave
    await viewSystemUserPage.validateLeaveTab();
});

When("the user  selects  the {string} button",async function (buttonName: string) 
{
    await viewSystemUserPage.validateApply(buttonName);
}); 

Then("the user should be able to view all the components within the Apply tab.", async function () {
    //Apply
    await viewSystemUserPage.validateApplyTab();
});

Then("the user should be able to view all the components within the My Leave tab.", async function () {
    //My Leave
    await viewSystemUserPage.validateMyLeaveTab();
});

//apply leave date validation
When("the user  selects  the apply button",async function () 
{
    await viewSystemUserPage.validateApplyButton();
});

When("Enters the {string} and {string}",async function (fromDate: string, toDate: string) 
{
    await viewSystemUserPage.enterLeaveDates(fromDate, toDate);
});

Then("the user should receive a success or failure message",async function ()
{
    const status = await viewSystemUserPage.validateSuccessMessage();
    console.log(status);

}); 

Then("the user should be able to view all the components within the Table.", async function () {
    //Table

   const tableData = await viewSystemUserPage.fetchTableData();
//    Array.from(tableData);
    console.log(tableData);
});