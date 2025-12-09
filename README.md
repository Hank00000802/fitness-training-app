# 健身訓練 APP

這是一個使用 React 和 Tailwind CSS 打造的健身訓練應用程式。

## 主要功能

- **身體部位選擇**：輕鬆挑選想訓練的身體部位
- **動作列表**：瀏覽該部位所有可做的訓練動作
- **動作詳情**：查看動作名稱、描述、圖片與注意事項
- **離線支援**：提供離線也能瀏覽的體驗
- **簡潔美觀 UI**：使用 Tailwind CSS 打造現代風格

## 技術架構

- **React 18**：前端框架
- **Tailwind CSS**：樣式框架
- **JavaScript**：程式語言

## 專案結構

```
src/
├── components/          # React 元件
│   ├── BodyPartGrid.js    # 身體部位選擇網格
│   ├── ExerciseList.js    # 動作列表
│   ├── ExerciseDetail.js  # 動作詳情
├── data/               # 資料檔
│   └── exerciseData.js    # 動作資料
├── App.js              # 主應用程式入口與頁面切換
├── index.js            # React 入口
└── index.css           # 全域樣式
```

## 安裝與啟動

1. 安裝依賴套件：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm start
```

3. 瀏覽器開啟 `http://localhost:3000`

## 使用方式

1. **選擇部位**：在首頁點選想訓練的身體部位
2. **瀏覽動作**：在動作列表點選想查看的動作
3. **查看詳情**：查看動作名稱、圖片、描述與注意事項
4. **返回**：使用返回按鈕回到前一頁

## 開發進度

- [x] 初版 UI 架構
- [x] 基本身體部位與動作列表
- [x] 動作詳情頁
- [x] 安裝與啟動流程
- [ ] 新增更多部位
- [ ] 圖片資源補齊
- [ ] 新增更多動作
- [ ] 增強離線與快取
- [ ] 新增多語系

## 授權

MIT License

## 開發與提交流程

步驟 0：開發測試
serve -s build

步驟 1：啟動開發
```bash
npm start
```

步驟 2：提交程式碼
```bash
git add .
git commit -m "Add new exercises and tips"
git push
```

步驟 3：部署
- Netlify 自動化部署
- 約需 1-2 分鐘
- 確認部署頁面正常