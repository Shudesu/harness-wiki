const site = "https://harness-wiki.pages.dev";
const key = "895364707a42ed8ef9c9415be22df44a";
const sitemap = await fetch(`${site}/sitemap.xml`).then((response) => {
  if (!response.ok) throw new Error(`sitemap: HTTP ${response.status}`);
  return response.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
urlList.push(`${site}/llms.txt`, `${site}/llms-full.txt`, `${site}/research/catalog.json`);
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "harness-wiki.pages.dev", key, keyLocation: `${site}/${key}.txt`, urlList: [...new Set(urlList)] }),
});
if (!response.ok) throw new Error(`IndexNow: HTTP ${response.status} ${await response.text()}`);
console.log(`IndexNow accepted ${new Set(urlList).size} URLs: HTTP ${response.status}`);
