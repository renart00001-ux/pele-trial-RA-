# 💎 Obsidian Pele 試用實驗室 (Pele Trial & Interactive Studio)

> 專為試用與評估 Obsidian 團隊最新開源之高效無依賴 Mermaid-to-SVG 渲染引擎 **[obsidianmd/pele](https://github.com/obsidianmd/pele)** 所建立的獨立試用專案。

---

## 🌟 為什麼 Obsidian 要開發 Pele？

傳統的 `mermaid.js` 雖然功能豐富，但面臨三大痛點：
1. **龐大的體積**：打包後動輒數 MB，載入緩慢。
2. **渲染速度慢且非同步**：依賴瀏覽器 DOM 測量字型與版面，渲染圖表需要數十至數百毫秒，且無法在純後端或背景執行緒無痛同步渲染。
3. **主題切換繁複**：更換深淺色主題需重新銷毀並重算整個圖表。

**Obsidian Pele** 解決了上述所有問題：
* ⚡ **次毫秒級同步渲染**：純 JavaScript 同步實作，單圖渲染僅需 **0.3 ~ 1.5 毫秒**（實測比 Mermaid.js 快 100~500 倍！）。
* 📦 **零執行時期依賴 (Zero Dependencies)**：極致輕量，無任何龐大第三方函式庫。
* 🎨 **CSS 變數原生主題**：採用 `--pele-bg`、`--pele-fg` 等 CSS 變數定義樣式，切換主題**只需切換 CSS 類別，完全不需重新渲染**！
* 📐 **支援 Mermaid 12.1.0 規範**：支援 Flowchart、Sequence、GitGraph、Mindmap、Architecture、Class、State、ER、Pie 等全部常見圖表。

---

## 📂 專案檔案架構

```text
pele-trial(RA)/
├── index.html          # 💎 Pele Interactive Studio (互動式圖表工作台與多主題切換)
├── pele.global.js      # 📦 Pele 1.12.0 獨立單檔瀏覽器端核心 (可 100% 離線運行)
├── render-cli.mjs      # 🛠️ Node.js CLI 工具：一行指令將 .mmd 轉為 .svg
├── benchmark.mjs       # ⏱️ 效能基準測試腳本 (實測吞吐量達 3,000+ 圖表/秒)
├── samples/            # 📝 常用 Mermaid 範例檔案
│   ├── flowchart.mmd   # 流程圖範例
│   ├── gitgraph.mmd    # Git 分支演進圖範例
│   ├── sequence.mmd    # 時序圖範例
│   ├── mindmap.mmd     # 心智圖範例
│   └── architecture.mmd# 雲端架構圖範例
├── package.json        # 專案相依性 (pele ^1.12.0)
└── README.md           # 專案說明文件
```

---

## 🚀 快速上手 (Quick Start)

### 1. 啟動互動式圖表工作台 (Pele Studio)
* **最簡方式**：直接用瀏覽器點擊開啟 `index.html`（專案內建 `pele.global.js`，無須任何伺服器即可離線運行）。
* **本地 Dev 伺服器**：
  ```bash
  npx serve .
  # 或使用 VS Code Live Server 開啟
  ```

### 2. 使用 CLI 將 Mermaid 檔案轉為 SVG
```bash
# 轉譯 sample 檔案
node render-cli.mjs samples/flowchart.mmd output.svg

# 即時轉譯字串
node render-cli.mjs --string "flowchart LR; A-->B" output.svg
```

### 3. 執行效能基準測試 (Benchmark)
```bash
node benchmark.mjs
```

**本機實測數據 (Node.js v20 / 500 次迭代)**：
* `GitGraph (9 commits)`：平均 **0.32 ms**（每秒高達 **3,116 次** 渲染）
* `Mindmap (心智圖)`：平均 **0.51 ms**（每秒高達 **1,939 次** 渲染）
* `Sequence (時序圖)`：平均 **0.52 ms**（每秒高達 **1,899 次** 渲染）
* `Flowchart (流程圖)`：平均 **1.65 ms**（每秒高達 **604 次** 渲染）

---

## 🎨 CSS 變數主題範例 (Theming)

透過在容器加上 CSS 變數，圖表能瞬間自動變色，無須重新編譯 SVG：

```css
.my-custom-theme {
  --pele-bg: #1e1e1e;
  --pele-fg: #dcddde;
  --pele-muted: #8e8e8e;
  --pele-line: #5c5c5c;
  --pele-surface: #252525;
  --pele-border: #404040;
  --pele-accent: #7c3aed;
  --pele-font: 'JetBrains Mono', sans-serif;
  --pele-radius: 6px;
}
```

---

## 🔗 相關連結
* 官方 GitHub：[obsidianmd/pele](https://github.com/obsidianmd/pele)
* 官方線上 Playground：[pele.run](https://pele.run)