import {Locator, Page} from "@playwright/test"

export class DashboardPage {
    
    readonly page:Page;
    readonly playlistModule: Locator

    constructor(page:Page){
        this.page = page;
        this.playlistModule = this.page.locator("nb-card").filter({hasText:"My Playlist"});
    }

    async clickOnWidget(widgetName: any): Promise<null | string>{
        let widget = await this.page.locator("nb-card").filter({hasText:widgetName})
        await widget.locator("i").click() //click on widget and change it's status
        return widget.locator(".status.paragraph-2").textContent() //returns current status after clicking
    }

    async switchTheme(theme:string){
        let themeDropdown = this.page.locator("nb-select").first()
        await themeDropdown.click()
        if(theme == 'light'){
            await this.page.locator('#nb-option-6').click()
            return await this.page.locator('.nb-theme-default').isVisible()
        }
        else {         
            await this.page.getByText(theme).click()   
            return await this.page.locator('.nb-theme-'+theme).isVisible()
        }
    }

    async getCurrentTrackName(): Promise<null| string> {
        return this.playlistModule.locator(".details").locator("h4").textContent()
    }

    /** 
       * Changes track based on position: 
       * forward - next track
       * back - previous track
    */
    async changeTrack(position:string) { 
        return await this.playlistModule.locator('[icon="skip-'+position+'-outline"]').click()
    }
    
    async playTrack(): Promise<void> {
        return await this.playlistModule.locator(".play").click()
    }

    async getCurrentPlaytime(): Promise<null | string>{
        return await this.playlistModule.locator(".current").textContent()
    }

    async enableTrackRepeat(){
        return await this.playlistModule.locator('[icon="repeat-outline"]').click()
    }

}