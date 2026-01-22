// お知らせ詳細表示処理（ID付与・フィールドID：pictures対応）
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    const list = data.contents.map(item => {
        let imagesHtml = "";

        if (item.pictures && Array.isArray(item.pictures)) {
            imagesHtml = item.pictures.map(img => `
                <img src="${img.url}" alt="" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 4px; display: block;">
            `).join("");
        }

        // 重要：divタグに id="${item.id}" を追加しました
        return `
            <div id="${item.id}" class="news-item" style="scroll-margin-top: 30px; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
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
