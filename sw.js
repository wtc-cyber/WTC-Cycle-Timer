const CACHE_NAME = 'cycle-timer-v1';

// 呢度填寫你所有需要離線用嘅檔案
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
    // 如果你有獨立嘅 CSS 或 JS 檔，記得加埋落嚟，例如 './style.css'
];

// 安裝時：將上面啲檔案全部 Save 落手機 Cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] 離線檔案打包中...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 啟動時：清走舊版本嘅 Cache，確保你每次 update 都有最新版
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// 斷網時 (核心)：當手機無上網，就喺 Cache 攞返啲檔案出嚟用
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // 如果 Cache 有，就畀 Cache 嘅檔案；如果無，先至上網攞
            return response || fetch(e.request);
        })
    );
});
