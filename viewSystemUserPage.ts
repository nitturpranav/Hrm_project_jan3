import { expect, Page, Browser, chromium } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
export default class ViewSystemUserPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    async navigateToMainPage() {
        await fixture.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        const userNameField = fixture.page.locator(`//input[@name="username"]`);
        await userNameField.fill("Admin");
        const passwordField = fixture.page.locator(`//input[@name="password"]`);
        await passwordField.fill("admin123");
        const loginButton = fixture.page.locator(`//button[text()=" Login "]`);
        await loginButton.click();
    }
    async validateDashboard() {
        const dashboard = fixture.page.locator(`//h6[text()="Dashboard"]`);
        await expect(dashboard).toBeVisible();
    }
    async validateProfile() {

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
    }
    async validateUpgradeButton() {
        const upgradeButton = fixture.page.locator(`//a[@class="orangehrm-upgrade-link"]`);
        await expect(upgradeButton).toBeVisible();
    }
    async validateLeftPanelComponents() {
        //logo
        const logo = fixture.page.getByRole('link', { name: 'client brand banner' })
        await expect(logo).toBeVisible();

        //Search
        const search = fixture.page.locator(`//input[@placeholder="Search"]`);
        await expect(search).toBeVisible();

        //Admin
        const admin = fixture.page.locator(`//span[text()="Admin"]`);
        await expect(admin).toBeVisible();

        //PIM
        const pim = fixture.page.locator(`//span[text()="PIM"]`);
        await expect(pim).toBeVisible();

        //Leave
        const leave = fixture.page.locator(`//span[text()="Leave"]`);
        await expect(leave).toBeVisible();

        //Time
        const time = fixture.page.locator(`//span[text()="Time"]`);
        await expect(time).toBeVisible();

        //Recruitment
        const recruitment = fixture.page.locator(`//span[text()="Recruitment"]`);
        await expect(recruitment).toBeVisible();

        //Performance
        const performance = fixture.page.locator(`//span[text()="Performance"]`);
        await expect(performance).toBeVisible();

        //Dashboard
        const dashboard = fixture.page.locator(`//a[@class="oxd-main-menu-item active"]//span[text()="Dashboard"]`);
        await expect(dashboard).toBeVisible();

        //Directory
        const directory = fixture.page.locator(`//span[text()="Directory"]`);
        await expect(directory).toBeVisible();

        //Maintenance
        const maintenance = fixture.page.locator(`//span[text()="Maintenance"]`);
        await expect(maintenance).toBeVisible();

        //Claim
        const claim = fixture.page.locator(`//span[text()="Claim"]`);
        await expect(claim).toBeVisible();

        //Buzz
        const buzz = fixture.page.locator(`//span[text()="Buzz"]`);
        await expect(buzz).toBeVisible();
    }
    async leaveButton(buttonName: string) {
        const button = fixture.page.locator(`//span[text()="${buttonName}"]`);
        await button.click();
    }
    async validateLeaveTab() {
        //Apply
        const ApplyButton = fixture.page.locator(`//a[text()="Apply"]`);
        await expect(ApplyButton).toBeVisible();

        //My Leave
        const myLeave = fixture.page.locator(`//a[text()="My Leave"]`);
        await expect(myLeave).toBeVisible();

        //Entitlements
        const entitlements = fixture.page.locator(`//span[normalize-space(text())="Entitlements"]`);
        await expect(entitlements).toBeVisible();
        entitlements.click();

        //dropdown of Entitlements
        const addEntitlements = fixture.page.locator(`//a[text()="Add Entitlements"]`);
        await expect(addEntitlements).toBeVisible();

        const employeeEntitlements = fixture.page.locator(`//a[text()="Employee Entitlements"]`);
        await expect(employeeEntitlements).toBeVisible();

        const myEntitlements = fixture.page.locator(`//a[text()="My Entitlements"]`);
        await expect(myEntitlements).toBeVisible();

        //Reports
        const reports = fixture.page.locator(`//span[normalize-space(text())="Reports"]`);
        await expect(reports).toBeVisible();
        reports.click();

        //dropdown of Reports
        const leaveEntitlementsAndUsageReport = fixture.page.locator(`//a[text()="Leave Entitlements and Usage Report"]`);
        await expect(leaveEntitlementsAndUsageReport).toBeVisible();

        const myLeaveEntitlementsAndUsageReport = fixture.page.locator(`//a[text()="My Leave Entitlements and Usage Report"]`);
        await expect(myLeaveEntitlementsAndUsageReport).toBeVisible();

        //Configure



        const configure = fixture.page.locator(`//span[normalize-space(text())="Configure"]`);
        await expect(configure).toBeVisible();
        configure.click();

        //dropdown of Configure

        const leavePeriod = fixture.page.locator(`//a[text()="Leave Period"]`);
        await expect(leavePeriod).toBeVisible();

        const leaveType = fixture.page.locator(`//a[text()="Leave Types"]`);
        await expect(leaveType).toBeVisible();

        const workWeek = fixture.page.locator(`//a[text()="Work Week"]`);
        await expect(workWeek).toBeVisible();

        const holidays = fixture.page.locator(`//a[text()="Holidays"]`);
        await expect(holidays).toBeVisible();

        //Leave List Page

        const leaveList = fixture.page.locator(`//a[text()="Leave List"]`);
        await expect(leaveList).toBeVisible();

        const assignLeave = fixture.page.locator(`//a[text()="Assign Leave"]`);
        await expect(assignLeave).toBeVisible();
    }
    async validateApply(buttonName: string) {
        const button = fixture.page.locator(`//span[text()="Leave"]`);
        await button.click();
        if (buttonName === "My Leave") {
            const myLeaveButton = fixture.page.locator(`//a[text()="${buttonName}"]`);
            await myLeaveButton.click();
            this.validateMyLeaveTab();
        }
        else {
        const applyButton = fixture.page.locator(`//a[text()="${buttonName}"]`);
        await applyButton.click();
        this.validateApplyTab();
        }

    }


    async validateApplyTab() {
        const applyLeaveText = fixture.page.locator(`//h6[text()="Apply Leave"]`);
        expect(applyLeaveText).toBeVisible();

        const labelLeaveType = fixture.page.locator(`//label[text()="Leave Type"]`);
        expect(labelLeaveType).toBeVisible();

        const dropDownValidation = fixture.page.locator(`//div[text()="-- Select --"]`);
        expect(dropDownValidation).toBeVisible();
        dropDownValidation.click();

        const canfmlaOption = await fixture.page.getByRole('option', { name: 'CAN - FMLA' })
        await canfmlaOption.click();

        const dateLabel = await fixture.page.getByText('From Date')
        dateLabel.click();


        const toDateLabel = await fixture.page.getByText('To Date')
        toDateLabel.click();

        const dateText1 = await fixture.page.getByPlaceholder('yyyy-dd-mm').first()
        expect(dateText1).toBeVisible();

        const dataText2 = await fixture.page.getByPlaceholder('yyyy-dd-mm').nth(1)
        expect(dataText2).toBeVisible();

        const commentText = await fixture.page.getByText('Comments')
        expect(commentText).toBeVisible();

        const commentTextBox = await fixture.page.locator('textarea')
        expect(commentTextBox).toBeVisible();

        const requiredText = await fixture.page.getByText('* Required')
        expect(requiredText).toBeVisible();

        const applyButton = await fixture.page.getByRole('button', { name: 'Apply' })
        expect(applyButton).toBeVisible();

        const leaveBalance = await fixture.page.getByText('Leave Balance')

        const leaveBalanceValue = await fixture.page.getByText('0.00')
        expect(leaveBalanceValue).toBeVisible();
    }
    async validateMyLeaveTab() {

        //My Leave list Text
        const myLeaveList = await fixture.page.getByRole('heading', { name: 'My Leave List' });
        await expect(myLeaveList).toBeVisible();

        //Label From Date
        const fromDate = await fixture.page.getByText('From Date')
        await expect(fromDate).toBeVisible();

        //Text Box From Date

        const textData = await fixture.page.getByPlaceholder('yyyy-mm-dd').first()
        await expect(textData).toBeVisible();


        //Label To Date
        const toDate = await fixture.page.getByText('To Date')
        await expect(toDate).toBeVisible();

        //Text Box To Date
        const textDate = await fixture.page.getByPlaceholder('yyyy-mm-dd').nth(1)
        await expect(textData).toBeVisible();

        //leave status
        const leaveStatus = await fixture.page.getByText('Show Leave with Status')
        await expect(leaveStatus).toBeVisible();

        //drop down of leave status

        await fixture.page.getByText('-- Select --')
        await fixture.page.getByText('Rejected')
        await fixture.page.getByText('Cancelled')
        await fixture.page.getByText('Pending Approval', { exact: true })
        await fixture.page.getByText('Taken')

        //Leave Type

        await fixture.page.getByText('Leave Type')

await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: '-- Select --' }).click();
await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: 'US - Bereavement' }).click();
await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: 'US - FMLA' }).click();
await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: 'US - Personal' }).click();
await fixture.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
await fixture.page.getByRole('option', { name: 'US - Vacation' }).click();


        // Button Validation 
        await fixture.page.getByRole('button', { name: 'Reset' }).click();
        await fixture.page.getByRole('button', { name: 'Search' }).click();

        //Requiured Text Validation
        await fixture.page.getByText('* Required').click();
    }

    async validateApplyButton() {
        const button1 = fixture.page.locator(`//span[text()="Leave"]`);
        await button1.click();


        const button = fixture.page.locator(`//a[text()="Apply"]`);
        await button.click();
    }
    async enterLeaveDates(fromDate: string, toDate: string) {

        
        const dropDownValidation = fixture.page.locator(`//div[text()="-- Select --"]`);
        expect(dropDownValidation).toBeVisible({ timeout: 1000 });
        dropDownValidation.click()

        const canfmlaOption = await fixture.page.getByRole('option', { name: 'CAN - FMLA' })
        await canfmlaOption.click();

        await fixture.page.waitForTimeout(2000);


        const fromDateText = await fixture.page.getByPlaceholder('yyyy-dd-mm').first()
        await fromDateText.click();
        await fromDateText.fill(fromDate);
        await fixture.page.waitForTimeout(2000);
        const toDateText = await fixture.page.getByPlaceholder('yyyy-dd-mm').nth(1)
        await  toDateText.click();
        await toDateText.fill(toDate);
        await fixture.page.waitForTimeout(2000);
  
        const commentTextBox = await fixture.page.locator('textarea')
        commentTextBox.fill('Resort')

        const applyButton = await fixture.page.getByRole('button', { name: 'Apply' })
        expect(applyButton).toBeVisible();
        await applyButton.click();

    }
    async validateSuccessMessage() 
    {
        const successful =await fixture.page.getByText(`SuccessSuccessfully Saved×`)
        if(successful)
        {
            return "Applied Leave Successfully"
        }
        else
        {
            return "Failed to Apply Leave"
        }
    } 

     async fetchTableData() {

        // const button = fixture.page.locator(`//span[text()="Leave"]`);
        // await button.click();

        // const MyLeaveButton = fixture.page.locator(`//a[text()="My Leave"]`);
        // await MyLeaveButton.click();

        // await fixture.page.waitForTimeout(5000);

        // // Locate all the header cells
        // const headerCells = await fixture.page.locator('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th').all();
        // const rows = await fixture.page.locator('.oxd-table-row').all();
        // const tableData = [];
        // // Extract the text content of each header cell
        // const headers = [];
        // for await(const cell of headerCells) {
        //     const headerText = await cell.innerText();
        //     headers.push(headerText.trim()); // Trim any extra whitespace
        // }
        // tableData.push(headers);

        // // Extract the text content of each row
        
        // for await(const row of rows) {
        //     const rowData = [];
        //     const cells = await row.locator('.oxd-table-cell.oxd-padding-cell').all();
        //     for await(const cell of cells) {
        //     const cellText = await cell.innerText();
        //     rowData.push(cellText.trim()); // Trim any extra whitespace
        //     }
        //     tableData.push(rowData);
        // }
        
        // return {tableData };
        // }
        const leaveDataMap = new Map<string, string[]>();
        const headers = await fixture.page.locator('.orangehrm-container .oxd-table-header-cell.oxd-padding-cell.oxd-table-th').all();
        const rows = await fixture.page.locator('.orangehrm-container .oxd-table-row').all();
    
        for (const row of rows) {
            const cells = await row.locator('.oxd-table-cell.oxd-padding-cell').all();
            const rowData = [];
            for (const cell of cells) {
                rowData.push(await cell.innerText());
            }
            if (rowData.length > 0) {
                for (let i = 0; i < headers.length; i++) {
                    const headerText = await headers[i].innerText();
                    if (!leaveDataMap.has(headerText)) {
                        leaveDataMap.set(headerText, []);
                    }
                    leaveDataMap.get(headerText)?.push(rowData[i]);
                }
            }
        }
        return leaveDataMap;
    }
}
