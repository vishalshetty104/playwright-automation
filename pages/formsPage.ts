import {Locator, Page} from "@playwright/test"


export class Formspage {

    page: Page

    constructor(page:Page) {
        this.page = page;
    }

    private async enterIntoFormInput(input:string,placeholderText:string, formTitle:string) {
        let inputField = this.page.locator('nb-card').filter({hasText:formTitle}).getByPlaceholder(placeholderText)
        await inputField.fill(input)
    }

    private async clickOnCheckbox(label:string, formTitle:string){
        let checkbox = this.page.locator('nb-card').filter({hasText:formTitle}).locator("nb-checkbox",{hasText:label})
        await checkbox.click()
    }

    private async submitForm(formTitle:string){
        await this.page.locator('nb-card').filter({hasText:formTitle}).getByRole("button").click()
    }

    private async clickOnRadioButton(label:string,formTitle:string){
        await this.page.locator('nb-card').filter({hasText:formTitle}).locator("label",{hasText:label}).click()
    }

    async fillInlineForm(rememberMe:boolean){
        await this.enterIntoFormInput("Vishal","Jane Doe","Inline form")
        await this.enterIntoFormInput("vish@gmail.com","Email","Inline form")
        if(rememberMe){
            await this.clickOnCheckbox("Remember me","Inline form")
        }
        await this.submitForm("Inline form")
    }

    async fillUsingTheGridForm(clickOnOption:string){
        await this.enterIntoFormInput("vish@gmail.com","Email","Using the Grid")
        await this.enterIntoFormInput("password101","Password","Using the Grid")
        await this.clickOnRadioButton(clickOnOption,"Using the Grid")
        await this.submitForm("Using the Grid")
    }
}