import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';

let dashboardPage: DashboardPage;

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/");
    dashboardPage = new DashboardPage(page);
});

test.describe.parallel("Theme Module", ()=>{
    test("Switch to Dark", async({page})=>{
        let result = await dashboardPage.switchTheme("dark")
        expect(result).toBeTruthy()
    })

    test("Switch to Light", async({page})=>{
        let result = await dashboardPage.switchTheme("light")
        expect(result).toBeTruthy()
    })

    test("Switch to Cosmic", async({page})=>{
        let result = await dashboardPage.switchTheme("cosmic")
        expect(result).toBeTruthy()
    })

    test("Switch to Corporate", async({page})=>{
        let result = await dashboardPage.switchTheme("corporate")
        expect(result).toBeTruthy()
    })
})

test.describe.parallel("Top Widgets", ()=>{
    test("Light",async({page})=>{
        expect(await dashboardPage.clickOnWidget("Light")).toEqual("OFF")
    });
    
    test("Roller Shades",async({page})=>{
        expect(await dashboardPage.clickOnWidget("Roller Shades")).toEqual("OFF")
    });

    test("Wireless Audio",async({page})=>{
        expect(await dashboardPage.clickOnWidget("Wireless Audio")).toEqual("OFF")
    });

    test("Coffee Maker",async({page})=>{
        expect(await dashboardPage.clickOnWidget("Coffee Maker")).toEqual("OFF")
    });
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