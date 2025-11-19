import { test, expect } from '@playwright/test';
import { link } from 'fs';

// Tests for navigation through main pages
[
    {pg:'/', link:'home', head:'The Public\'s Landing Page', subh:null},
    {pg:'/character', link:'character', head:'The Public\'s Character Page', subh:'Character'},
    {pg:'/campaign', link:'campaign', head:'The Public\'s Campaign Page', subh:'Campaign'},
    {pg:'/notebook', link:'notebook', head:'The Public\'s Notebook Page', subh:'Notebook'},
    {pg:'/world', link:'world', head:'The Public\'s World Page', subh:null},
    {pg:'/lore', link:'lore', head:'The Public\'s Lore Page', subh:'Lore'},
    {pg:'/homebrew', link:'homebrew', head:'The Public Homebrewery', subh:'Homebrew'},
].forEach(({pg, link, head, subh}) => {
    test.describe('testing navigation', ()=>{
        test(`testing ${link} page`, async ({page})=>{
            await page.goto(pg);
            const linkEl = page.getByRole('tab',{name: link, exact:true});
            await expect(linkEl).toBeVisible();
            await expect(linkEl).toHaveAttribute('aria-selected', 'true');
            const headEl = page.getByRole('heading', {name:head})
            await expect(headEl).toBeVisible();
            if (subh) {
                const subhEl = page.getByRole('heading', {name:subh, exact:true})
                await expect(subhEl).toBeVisible();
            }
            page.close()
        });
    });
});

// Tests for navigation through kothis map links
['Herzog', 
    'Draconia', 
    'Dramir', 
    'Elandir', 
    'Faena', 
    'Praetor', 
    'Rokesh', 
    'Wildlands', 
    'Mak-Dur', 
    'Pon', 
    'Grummond', 
    'Durin-Hast', 
    'Breitdecke', 
    'Hukschtein', 
    'Pyrus', 
    'Taishta', 
    'Valeus', 
    'Wither', 
    'Lythe', 
    'Seagate', 
    'Promisory', 
    'Half-Hall', 
    'Schism'
].forEach(async (loc)=> {
    test(`testing kothis map link to ${loc}`, async ({page}) => {
        await page.goto('/');
        await expect(page.locator('#image1')).toBeVisible();
        let modLoc = loc.replace(/-/g, '').replace(/'/g, ''); // remove hyphens and apostrophes for searching
        let linkEl = page.locator(`#${modLoc.toLowerCase()}Link`); // need to use id due to special characters and formatting
        await expect(linkEl).toBeVisible();
        let nation = '';
        if (['Grummond', 'Durin-Hast', 'Breitdecke', 'Hukschtein'].includes(loc)) {
            nation = 'herzog';
        } else if (['Pyrus'].includes(loc)) {
            nation = 'draconia';
        } else if (['Taishta', 'Valeus'].includes(loc)) {
            nation = 'elandir';
        } else if (['Wither', 'Lythe'].includes(loc)) {
            nation = 'faena';
        } else if (['Seagate', 'Promisory', 'Half-Hall', 'Schism'].includes(loc)) {
            nation = 'praetor';
        } else if (['Mak-Dur'].includes(loc)) {
            nation = 'rokesh';
        } else if (['Pon'].includes(loc)) {
            nation = 'wildlands';
        } else {
            nation = loc.toLowerCase()
        }
        if(nation === loc.toLowerCase()){
            await expect(linkEl).toHaveAttribute('href', `world/${nation}`);
        } else {
            if(loc.includes('-')){
                loc = loc.replace(/-/g, '');
            }
            await expect(linkEl).toHaveAttribute('href', `world/${nation}/${loc.toLowerCase()}`);
        }
        if(loc === 'Wildlands'){
            await linkEl.dispatchEvent('click'); // Wildlands link needs special handling center is outside of link for playwright
        } else {
            await linkEl.click();
        }
        await expect(page.getByRole('heading',{level:1,name:(nation)})).toBeVisible();
        await page.close();
    });
});

// Tests for login SpeedDial
test.describe('testing login SpeedDial', ()=>{
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        const speedDial = page.getByRole('button',{name:'SpeedDial'});
        await expect(speedDial).toBeVisible();
        speedDial.hover();
    })
    test('testing non-auth buttons visibility', async ({page})=>{
        const loginBtn = page.getByRole('menuitem',{name:'Log In'});
        await expect(loginBtn).toBeVisible();
        const signUpBtn = page.getByRole('menuitem',{name:'Sign Up'});
        await expect(signUpBtn).toBeVisible();
    })
    // Testing Login flow
    // Testing Sign Up flow
    // Gotta look at it a bit closer, I'm wicked tired... prolly because it's 4am (almost)
    // This one directly requires login so gonna wait for it.
    // test('testing auth buttons visibility', async ({page})=>{
    //     const logOutBtn = page.getByRole('button',{name:'Log Out'});
    //     await expect(logOutBtn).toBeVisible();
    //     const profileBtn = page.getByRole('button',{name:'Profile'});
    //     await expect(profileBtn).toBeVisible();
    // })
});