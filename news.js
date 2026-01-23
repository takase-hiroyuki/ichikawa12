// 1件ずつ表示し、前後へ移動できる詳細ページ処理
async function loadNews() {
//    const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?fields=id,title&limit=100";
    const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?limit=100";
//    const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news";
    const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

    try {
        const res = await fetch(ENDPOINT, {
            headers: { "X-MICROCMS-API-KEY": API_KEY }
        });
        const data = await res.json();
        const articles = data.contents;

        // 現在表示すべき記事のインデックス（番号）を探す
        const hash = window.location.hash.substring(1);
        let currentIndex = articles.findIndex(a => a.id === hash);
        
        // もしIDが不明、または直接 news.html を開いた場合は最新（0番目）を表示
        if (currentIndex === -1) currentIndex = 0;

        const item = articles[currentIndex];

        // 画像の組み立て
        let imagesHtml = "";
        if (item.pictures && Array.isArray(item.pictures)) {
            imagesHtml = item.pictures.map(img => `
                <img src="${img.url}" alt="" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 4px; display: block;">
            `).join("");
        }

        // 「前へ」「次へ」のリンク先を計算
        const prevId = currentIndex > 0 ? articles[currentIndex - 1].id : null;
        const nextId = currentIndex < articles.length - 1 ? articles[currentIndex + 1].id : null;

// HTMLの組み立て
        document.getElementById("news-list").innerHTML = `
            <article class="news-item">
                <div class="news-navigation top">
                    ${prevId ? `<a href="#${prevId}" class="nav-button" onclick="setTimeout(()=>location.reload(),10)">新しい方</a>` : `<span class="nav-button disabled">新しい方</span>`}
                    ${nextId ? `<a href="#${nextId}" class="nav-button" onclick="setTimeout(()=>location.reload(),10)">古い方</a>` : `<span class="nav-button disabled">古い方</span>`}
                </div>

                <h1>${item.title}</h1>
                <div class="news-content">${item.content}</div>
                <div class="news-images">${imagesHtml}</div>
                
                <div class="news-navigation bottom">
                    ${prevId ? `<a href="#${prevId}" class="nav-button" onclick="setTimeout(()=>location.reload(),10)">新しい方</a>` : `<span class="nav-button disabled">新しい方</span>`}
                    ${nextId ? `<a href="#${nextId}" class="nav-button" onclick="setTimeout(()=>location.reload(),10)">古い方</a>` : `<span class="nav-button disabled">古い方</span>`}
                </div>
            </article>
        `;

    } catch (err) {
        document.getElementById("news-list").innerHTML = "読み込みに失敗しました。";
        console.error(err);
    }
}

// URLの#が切り替わった時に再読み込みして表示を更新する設定
window.addEventListener('hashchange', () => location.reload());

loadNews();
