// お知らせ詳細表示処理（async/await を利用した確実なスクロール対応）
async function loadNews() {
    const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news";
    const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

    try {
        // 1. データの取得が終わるまで待機 (await)
        const res = await fetch(ENDPOINT, {
            headers: { "X-MICROCMS-API-KEY": API_KEY }
        });
        const data = await res.json();

        // 2. HTMLの組み立て
        const list = data.contents.map(item => {
            let imagesHtml = "";
            if (item.pictures && Array.isArray(item.pictures)) {
                imagesHtml = item.pictures.map(img => `
                    <img src="${img.url}" alt="" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 4px; display: block;">
                `).join("");
            }

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
        
        // 3. 画面への描画を完了させる
        document.getElementById("news-list").innerHTML = list;

        // 4. 描画が終わったので、URLのハッシュ（#）を見て移動する
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // ブラウザが要素を認識できるよう、ごくわずかに待機してからスクロール
                requestAnimationFrame(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                });
            }
        }

    } catch (err) {
        document.getElementById("news-list").innerHTML = "お知らせの読み込みに失敗しました。";
        console.error(err);
    }
}

// 実行
loadNews();
