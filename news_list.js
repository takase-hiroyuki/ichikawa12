// お知らせ一覧ページ専用の取得処理
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?limit=100";
// const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?fields=id,title";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    const listContainer = document.getElementById("news-index");
    const listHtml = data.contents.map(item => `
        <li>
            <a href="news.html#${item.id}">${item.title}</a>
        </li>
    `).join("");
    listContainer.innerHTML = listHtml;
})
.catch(err => {
    document.getElementById("news-index").innerHTML = "お知らせ一覧の読み込みに失敗しました。";
    console.error(err);
});
