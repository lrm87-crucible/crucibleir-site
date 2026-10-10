# Crucible Investment Recovery: website

A static website (plain HTML, CSS and a little JavaScript). No build step, no database, no tracking.

## Pages
- index.html: home
- product.html: how it works
- holding-cost-calculator.html: free lead-magnet tool
- compare.html: vendor-neutral vs. marketplace-tied software
- guides/index.html: guides hub
- guides/internal-redeployment.html, guides/what-is-investment-recovery.html, guides/surplus-equipment-disposal-process.html: articles
- demo-request.html: pilot request form
- privacy.html: privacy notice (draft)
- demo/index.html: the interactive prototype (appraisal features hidden)

## Before you publish (find and replace)
1. `https://crucibleir.com` with your real domain (in every page, sitemap.xml and robots.txt).
2. `lawrence@crucibleir.com` with a real email address (in every page and js/site.js).

## Hosting cheaply
Any static host works. Cloudflare Pages, Netlify and GitHub Pages all have free tiers (check current limits). Upload the folder as-is.
Some hosts serve `/product` instead of `/product.html`. If yours does, update the canonical links and sitemap to match.

## The request form
It opens an email to you with the visitor's details filled in. That needs no server, but it depends on the visitor having a mail app set up. When you're ready, swap it for a hosted form service.

## Checklist before launch
- Read your employment agreement's outside-activity and IP terms.
- Search the name and logo (USPTO trademark search, Louisiana Secretary of State business search) and check the domain.
- Have an attorney review privacy.html and the claims in the FAQ (data use, security, "no commissions").
- After launch, submit sitemap.xml in Google Search Console.
- If you add analytics later, update privacy.html, because it currently says the site uses none.

## Images
img/plant-panorama.svg and img/redeployment-diagram.svg are original illustrations. img/og-image.png is the link-preview image for LinkedIn and search. To use real photography instead, keep the same file names and sizes, or update the img tags. Use only photos you own or have a license for, and avoid showing an employer's facilities or equipment.

## Home page photo
The home page shows img/plant-photo.jpg (1400 x 856 pixels), a stylized artwork made from a photo you supplied. To change it, replace that file, keep the name, and update the alt text on the `img class="photo"` line in index.html.
- Before publishing, confirm you own the photo, that you didn't take it as part of your employer's work, and that the facility's owner is fine with it being published. Equipment tags in the photo can identify a specific plant.
- Metadata (including any embedded location) was removed from the file.
- Never use an image copied from another website unless its license allows it.

## Appraisals
Appraisal features are left out of the site and the demo for now. In the full prototype (crucible-prototype.html), the line `const APPR_ON=true;` turns them on. In demo/index.html it is set to false.
