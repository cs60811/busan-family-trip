# 2026 釜山親子旅行手冊

這是一頁式互動旅行手冊，適合部署到 GitHub Pages。

## Files

- `index.html`: 互動網頁主檔
- `travel-handbook.md`: Markdown 版旅行手冊
- `assets/`: 置物櫃插圖與 App 圖示
- `manifest.webmanifest` / `sw.js`: PWA 設定與離線快取（可加到手機主畫面、離線使用）
- `.nojekyll`: 讓 GitHub Pages 直接輸出檔案，不經 Jekyll 處理

## GitHub Pages

部署方式建議使用 GitHub Pages：

1. 建立一個 public repository，例如 `busan-family-trip`.
2. 上傳本資料夾內所有檔案（含 `assets/`、`manifest.webmanifest`、`sw.js`、`.nojekyll`）.
3. 到 repository 的 `Settings` -> `Pages`.
4. Source 選 `Deploy from a branch`.
5. Branch 選 `main`，folder 選 `/ (root)`.
6. 儲存後等待 GitHub 產生網址。

## 更新內容時

- 修改 `index.html` 後，記得把 `sw.js` 開頭的 `CACHE_VERSION` 版本號 +1（例如 `v1` → `v2`），已安裝的離線快取才會更新。
- 手機瀏覽器開啟網址後可用「加入主畫面」，之後地鐵、飛機上斷網也能開啟手冊。

