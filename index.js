// トップページの最新お知らせ取得処理（1枚目の画像のみ表示）
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
        
        // 画像がある場合のみ、最初の1枚（index 0）のHTMLを作成
        let imageHtml = "";
        if (item.pictures && Array.isArray(item.pictures) && item.pictures.length > 0) {
            imageHtml = `
                <img src="${item.pictures[0].url}" alt="" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 4px; display: block;">
            `;
        }

        container.innerHTML = `
            <h3 style="margin: 10px 0;">${item.title}</h3>
            ${imageHtml}
            <div class="latest-news-text" style="margin-top: 10px;">
                ${item.content}
            </div>
        `;
    } else {
        container.innerHTML = "現在お知らせはありません。";
    }
})
.catch(err => {
    const container = document.getElementById("latest-news-content");
    if (container) {
        container.innerHTML = "読み込みに失敗しました。";
    }
    console.error(err);
});
