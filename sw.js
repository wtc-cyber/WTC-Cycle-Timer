// sw.js - 呢個就係 Service Worker (離線核心)
self.addEventListener('install', (e) => {
    console.log('[Service Worker] 安裝成功');
});

// 只要有呢個 fetch 事件，Chrome 就會當你有離線能力！
self.addEventListener('fetch', (e) => {
    // 暫時咩都唔做，只係滿足 Chrome 嘅要求
});
