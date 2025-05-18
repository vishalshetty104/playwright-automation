import {Locator, Page} from "@playwright/test"

export class NavigationPanel {

    readonly page : Page
    readonly navigationPanelLocator : Locator

    menuToPath: Record<string, string> = {
        'Form Layouts': 'layouts',
        'Dialog': 'dialog',
        'Datepicker': 'datepicker',
        'Window':'window',
        'Popover':'popover',
        'Toastr':'toastr',
        'Tooltip':'tooltip',
        'Calendar':'calendar',
        'Echarts':'echarts',
        'Smart Table':'smart-table',
        'Tree Grid':'tree-grid',
        'Login':'login',
        'Register':'register',
        'Request Password':'request-password',
        'Reset Password':'reset-password'
        // Add more mappings as needed
    };  

    constructor(page:Page){
        this.page = page;
        this.navigationPanelLocator = page.locator("nb-menu")
    }

    async navigateTo(pageName:string, subPageName:string){
        await this.navigationPanelLocator.getByText(pageName).click()
        await this.navigationPanelLocator.getByText(subPageName).click()
        await this.page.waitForLoadState('domcontentloaded')
        return this.page.url().endsWith(`/${this.menuToPath[subPageName]}`)
    }
}