import { test, expect } from '@playwright/test';
import { NavigationPanel } from '../pages/navigationPanel';
import { Formspage } from '../pages/formsPage';

let navigationPanel: NavigationPanel
let formsPage: Formspage

test.beforeEach(async({page})=>{
    navigationPanel = new NavigationPanel(page)
    formsPage = new Formspage(page)
    await page.goto("http://localhost:4200/");
    await navigationPanel.navigateTo("Forms","Form Layouts")
})

test.describe.parallel("Filling forms",()=>{
    
    test("Fill Inline form", async({page})=>{
        await formsPage.fillInlineForm(true)
    })


    test("Fill Using the grid form", async({page})=>{
        await formsPage.fillUsingTheGridForm("Option 2")
    })
})