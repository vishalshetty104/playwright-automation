import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { NavigationPanel } from '../pages/navigationPanel';

let dashboardPage: DashboardPage;
let navigationPanel: NavigationPanel;

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/");
    dashboardPage = new DashboardPage(page);
    navigationPanel = new NavigationPanel(page);
});

const themes = ["dark", "light", "cosmic", "corporate"]; 

test.describe.parallel("Theme Module",() => {
    for (const theme of themes) {
        test(`Switch to ${theme}`, {annotation:{type: 'Scenario',description: `User clicks on the themes dropdown and selects ${theme}`}},async ({ page }) => {
            const result = await dashboardPage.switchTheme(theme);
            expect(result).toBeTruthy();
        });
    }
});

const widgets = ["Light","Roller Shades","Wireless Audio","Coffee Maker"]

test.describe.parallel("Top Widgets", ()=>{
    for (const widget of widgets){
        test(`${widget}`,async({page})=>{
            expect(await dashboardPage.clickOnWidget(widget)).toEqual("OFF")
        });
    }
});

test.describe.parallel("My Playlist Module", ()=>{

    test("Play Track", async({page})=>{
        let intitalPlaytime = await dashboardPage.getCurrentPlaytime()
        await dashboardPage.playTrack(); //play track
        await page.waitForTimeout(3000)
        await dashboardPage.playTrack(); //pause track
        expect(await dashboardPage.getCurrentPlaytime()).not.toContain(intitalPlaytime)
    })

    test("Switch to next track", async({page})=>{
        let initalTrackName = await dashboardPage.getCurrentTrackName()
        await dashboardPage.changeTrack("forward")
        expect(await dashboardPage.getCurrentTrackName()).not.toContain(initalTrackName)
    })

    test("Switch to previous track", async({page})=>{
        let initalTrackName = await dashboardPage.getCurrentTrackName()
        await dashboardPage.changeTrack("back")
        expect(await dashboardPage.getCurrentTrackName()).not.toContain(initalTrackName)
    })

    test("Replay the same song", async({page})=>{
        let initalTrackName = await dashboardPage.getCurrentTrackName()
        await dashboardPage.enableTrackRepeat()
        await dashboardPage.changeTrack("forward")
        expect(await dashboardPage.getCurrentTrackName()).toContain(initalTrackName)
    })
})

test.describe("Navigation", ()=>{
    test("Navigate to Forms", async({page})=>{
        let result = await navigationPanel.navigateTo("Forms","Form Layouts")
        expect(result).toBeTruthy()
    })
})