// 規約ページ専用の取得処理
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/rules";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    document.getElementById("rules-content").innerHTML = `
        <h1>${data.title}</h1>
        <div class="description">
            ${data.content}
        </div>
    `;
})
.catch(err => {
    document.getElementById("rules-content").innerHTML = "規約の読み込みに失敗しました。";
    console.error(err);
});
