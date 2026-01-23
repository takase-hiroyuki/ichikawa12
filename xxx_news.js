// お知らせ詳細表示処理（数字から始まるIDに対応した安全版）
async function loadNews() {
    const ENDPOINT = "https://ichikawa12.microcms.io/api/v1/news?_t=" + new Date().getTime();
    const API_KEY = "dTdnQ20wXsKA1HB910ZbaODNqnWzKMdoZJF1";

    try {
        const res = await fetch(ENDPOINT, {
            headers: { "X-MICROCMS-API-KEY": API_KEY }
        });
        if (!res.ok) throw new Error('通信エラーが発生しました');
        const data = await res.json();

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
        
        document.getElementById("news-list").innerHTML = list;

        // 【修正ポイント】ハッシュ（#）の処理を安全な方法に変更
        const hash = window.location.hash;
        if (hash) {
            // # を除いた ID 文字列を取得
            const id = hash.substring(1);
            // querySelector(#数字) はエラーになるため、getElementById を使用
            const targetElement = document.getElementById(id);
            
            if (targetElement) {
                requestAnimationFrame(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                });
            }
        }

    } catch (err) {
        document.getElementById("news-list").innerHTML = "読み込みに失敗しました: " + err.message;
        console.error(err);
    }
}
loadNews();
