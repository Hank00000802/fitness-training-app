# 修改指南（健身 APP）

## A. 如何擴充或修改運動資料

### 1. 新增身體部位

在 `src/data/exerciseData.js` 的 `bodyParts` 陣列中加入：

```javascript
bodyParts: [
  { id: 'chest', name: '胸', icon: '?' },
  { id: 'biceps', name: '二頭肌', icon: '?' },
  // 新增更多部位...
  { id: 'calves', name: '小腿', icon: '?' },   // 例如：小腿
  { id: 'forearms', name: '前臂', icon: '?' }, // 例如：前臂
]
```

### 2. 為部位新增運動

在 `exercises` 物件中，對應的部位加入新運動：

```javascript
exercises: {
  chest: [
    // 既有運動...
    {
      id: 'incline_bench_press',           // 運動 ID
      name: '上斜臥推',                    // 運動名稱
      description: '強調上胸的啞鈴／槓鈴推舉', // 運動描述
      image: '/images/exercises/incline_bench_press.png', // 圖片路徑
      tips: [
        '椅背角度建議 30-45 度',
        '下放至手肘約 90 度',
        '上推時吐氣，下放吸氣',
        '全程控制，避免反彈'
      ]
    }
  ],
  // 其他部位範例
  calves: [
    {
      id: 'standing_calf_raise',
      name: '站姿提踵',
      description: '強化小腿腓腸肌與比目魚肌',
      image: '/images/exercises/standing_calf_raise.png',
      tips: [
        '腳掌全踩穩，再抬起腳跟',
        '在頂端稍作停留感受收縮',
        '緩慢下放，不要彈跳',
        '可負重增加強度'
      ]
    }
  ]
}
```

### 3. 圖片素材規範

1. **檔案格式與尺寸**
   - 建議使用 PNG，適當壓縮
   - 建議尺寸至少 300x200（可依需求調整）
   - 檔名與 `image` 路徑一致

2. **放置位置**
   - 將圖片放在 `public/images/exercises/`
   - 檢查檔名與程式中的路徑一致

### 4. 注意事項撰寫建議

`tips` 為字串陣列，建議 3-6 條，範例：

```javascript
tips: [
  '保持核心穩定，避免拱背',
  '控制下放，不要借力彈跳',
  '手肘路徑穩定，避免外展過多',
  '上推時吐氣，下放時吸氣',
  '依能力調整重量，動作優先於重量'
]
```

## B. 開發與提交流程

### 步驟 1：啟動開發
```bash
npm start
```

### 步驟 2：提交程式碼
```bash
git add .
git commit -m "Add new exercises and tips"
git push
```

### 步驟 3：部署
- Netlify 自動化部署
- 約需 1-2 分鐘
- 確認部署頁面正常

## C. 命名與圖片檢查

### 新增運動時的範例
```javascript
{
  id: 'decline_pushup',
  name: '下斜伏地挺身',
  description: '腳抬高、強化上胸與前三角的伏地挺身變化',
  image: '/images/exercises/decline_pushup.png',
  tips: [
    '雙手與肩同寬，核心收緊',
    '下放至胸接近地面',
    '保持身體一直線，避免塌腰',
    '用胸與前三角發力推回'
  ]
}
```

### 新增部位的範例
```javascript
{ id: 'core', name: '核心', icon: '?' }
```

### 新增該部位的運動範例
```javascript
core: [
  {
    id: 'plank',
    name: '棒式（平板支撐）',
    description: '靜態核心穩定訓練',
    image: '/images/exercises/plank.png',
    tips: [
      '肩膀在手肘正上方，核心收緊',
      '身體保持一直線，不要翹臀或塌腰',
      '維持均勻呼吸',
      '依能力維持 30 秒以上，循序漸進'
    ]
  }
]
```

## D. 品質檢查清單

1. **圖片與路徑一致**
2. **ID 唯一且有意義**
3. **描述與注意事項清楚**
4. **格式一致**：使用單引號、逗號、縮排

## E. 修改提交步驟

1. 編輯 `src/data/exerciseData.js`
2. 放入對應圖片
3. 執行 `npm start` 測試
4. 確認後 `git commit`
5. Netlify 部署
6. 最終人工檢查

若有疑問，請在提交前再次確認資料與圖片路徑，避免部署失敗。 