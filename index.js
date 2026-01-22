// トップページの最新お知らせ取得処理
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?limit=1";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    const container = document.getElementById("latest-news-content");
    if (data.contents.length > 0) {
        const item = data.contents[0];
        container.innerHTML = `
            <h3 style="margin: 10px 0;">${item.title}</h3>
            <div class="latest-news-text">
                ${item.content}
            </div>
        `;
    } else {
        container.innerHTML = "現在お知らせはありません。";
    }
})
.catch(err => {
    document.getElementById("latest-news-content").innerHTML = "読み込みに失敗しました。";
    console.error(err);
});
