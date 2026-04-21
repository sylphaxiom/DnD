import { expect, test } from '@playwright/test';

// Tests for navigation through main pages
[
    {pg:'/character', link:'character', head:'Characters'},
    {pg:'/campaign', link:'campaign', head:'Campaigns'},
    {pg:'/world', link:'world', head:'The World of Kothis'},
    {pg:'/homebrew', link:'homebrew', head:'Homebrewery'},
    {pg:'/notebook', link:'notebook', head:'Notebook'},
].forEach(({pg, link, head}) => {
    test.describe('testing navigation', ()=>{
        test(`testing ${link} page`, async ({page})=>{
            await page.goto("/");
            const linkEl = page.getByRole('tab',{name: link.toUpperCase(), exact:true});
            await expect(linkEl).toBeVisible();
            linkEl.click();
            await expect(page).toHaveURL(pg);
            await expect(page.getByRole('heading', {name: head})).toBeVisible();
            await expect(linkEl).toHaveAttribute('aria-selected', 'true');
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
].forEach( (loc)=> {
    test.describe('testing map links', ()=>{
        test(`testing kothis map link to ${loc}`, async ({page}) => {
            await expect(async()=>{await page.goto('/')}).toPass();
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
});

// Tests for quick links
[
    {pg:'/', links:[
        {link:'Lore Hub', dest:'/world/lore'}
    ]},
    {pg:'/world', links:[
        {link:'Lore Hub', dest:'/world/lore'},
        {link:'Creators', dest:'/world/lore/creators'},
        {link:'About the Site', dest:'/world/lore/portal'},
    ]},
].forEach(({pg, links})=>{
    test.describe('testing quick links', ()=>{
        test(`testing quick link to ${pg} page`, async ({page})=>{
            await page.goto(pg);
            const quickHead = page.getByRole('heading', { name: 'Quick Links' })
            await expect(quickHead).toBeVisible();
            for(const {link, dest} of links){
                const linkEl = page.getByRole('link', { name: link });
                await expect(linkEl).toBeVisible();
                await expect(linkEl).toHaveAttribute('href', dest);
                await linkEl.click();
                await expect(page).toHaveURL(dest);
                await page.goBack();
            }
        });
    });
})
