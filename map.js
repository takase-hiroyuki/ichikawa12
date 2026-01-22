// 地図ページ専用の取得処理
const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/map";
const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

fetch(ENDPOINT, {
    headers: { "X-MICROCMS-API-KEY": API_KEY }
})
.then(res => res.json())
.then(data => {
    // 地図の画像と説明を表示
    document.getElementById("map-content").innerHTML = `
        <h1>${data.title}</h1>
        <div class="map-image" style="margin-bottom: 20px;">
            <img src="${data.map_image.url}" alt="町会地図" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px;">
        </div>
        <div class="map-description">
            ${data.description}
        </div>
    `;
})
.catch(err => {
    document.getElementById("map-content").innerHTML = "地図の読み込みに失敗しました。";
    console.error(err);
});
