# RHINOSHIELD Website Team Development Interview Exam

這是一個簡易的 Nuxt 專案，在 Index 頁面中 render 了 600 張圖資，請以任何手段、任何方式，試圖改善或提升該頁面的效能、速度、最佳實踐，請 fork 一份專案到自己的帳號進行開發，完成後再提供專案的 URL 供參考。

實作的同時，可以註解、筆記或在此 Doc 中稍稍闡述思路與想法。
本題目作為延伸題，沒有正確答案，可以採用任何方式、任何調整。
方向 (能盡可能越多的優化策略越佳)：

- Blur Hash ?
- API Interface 調整 ?
- PWA (Service Worker) ?
- Infinite Scrolling ?
- Lazy Loading ?

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## 實作重點

1. 依據裝置大小，載入不同大小圖片（SSR用 useDevice，SPA 可用 window.innerWidth）
2. 無限滾動加載，使用分頁參數
3. 使用 img aspect-ratio: 1 / 1 固定高度，避免畫面跳動
4. 時實作 blur image，改寫 API, Interface，讓圖片相同
   若圖片尚未加載，使用 blur Img 模糊縮圖
5. 若模糊縮圖尚未加載，使用 skeleton 骨架動畫
6. loading="lazy" fetchpriority="low"
