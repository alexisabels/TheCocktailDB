/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE = 'https://cocktail.alexisabel.com';
const OUT = path.join(__dirname, '..', 'public', 'sitemap.xml');
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const POPULAR_INGREDIENTS = [
  'Whisky', 'Bourbon', 'Gin', 'Vodka', 'Tequila', 'Rum', 'Brandy',
  'Cognac', 'Vermouth', 'Champagne', 'Prosecco', 'Wine', 'Beer',
  'Sugar', 'Lemon', 'Lime', 'Orange', 'Mint', 'Bitters', 'Triple sec',
  'Amaretto', 'Cointreau', 'Aperol', 'Campari', 'Kahlua', 'Baileys',
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
  });
}

function urlTag(loc, priority, changefreq) {
  const cf = changefreq ? `<changefreq>${changefreq}</changefreq>` : '';
  const pr = priority ? `<priority>${priority}</priority>` : '';
  return `  <url><loc>${loc}</loc>${cf}${pr}</url>`;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  urls.push(urlTag(`${SITE}/`, '1.0', 'weekly'));
  urls.push(urlTag(`${SITE}/search`, '0.8', 'monthly'));

  ALPHABET.forEach((letter) => {
    urls.push(urlTag(`${SITE}/cocktails/${letter.toUpperCase()}`, '0.7', 'monthly'));
  });

  POPULAR_INGREDIENTS.forEach((ing) => {
    urls.push(urlTag(`${SITE}/ingredients/${encodeURIComponent(ing)}`, '0.7', 'monthly'));
  });

  const drinkIds = new Set();
  for (const letter of ALPHABET) {
    try {
      const data = await fetchJson(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      if (data && Array.isArray(data.drinks)) {
        data.drinks.forEach((d) => {
          if (d && d.idDrink) drinkIds.add(d.idDrink);
        });
      }
    } catch (err) {
      console.warn(`[sitemap] letter ${letter} fetch failed: ${err.message}`);
    }
  }

  Array.from(drinkIds)
    .sort()
    .forEach((id) => {
      urls.push(urlTag(`${SITE}/drink/${id}`, '0.6', 'monthly'));
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(OUT, xml);
  console.log(
    `[sitemap] wrote ${urls.length} URLs (${drinkIds.size} drink pages, generated ${today})`,
  );
}

main().catch((err) => {
  console.error('[sitemap] failed:', err);
  process.exit(0);
});
