// お知らせ一覧ページ専用の取得処理（画像表示対応版）
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    const list = data.contents.map(item => {
        // 画像がある場合だけ、HTMLの画像タグを作成する処理
        let imagesHtml = "";
        if (item.image && item.image.length > 0) {
            imagesHtml = item.image.map(img => `
                <img src="${img.url}" alt="" style="margin-top: 10px; border-radius: 4px;">
            `).join("");
        }

        return `
            <div class="news-item">
                <h2>${item.title}</h2>
                <div>${item.content}</div>
                <div class="news-images">
                    ${imagesHtml}
                </div>
            </div>
        `;
    }).join("");
    document.getElementById("news-list").innerHTML = list;
})
.catch(err => {
    document.getElementById("news-list").innerHTML = "お知らせの読み込みに失敗しました。";
    console.error(err);
});
