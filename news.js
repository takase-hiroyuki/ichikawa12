// お知らせ一覧ページ専用の取得処理
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    const list = data.contents.map(item => `
        <div class="news-item">
            <h2>${item.title}</h2>
            <div>${item.content}</div>
        </div>
    `).join("");
    document.getElementById("news-list").innerHTML = list;
})
.catch(err => {
    document.getElementById("news-list").innerHTML = "お知らせの読み込みに失敗しました。";
    console.error(err);
});
