# 健身 APP 修改指南

## ? 如何增加健身動作和注意事項

### 1. 增加新的身體部位

在 `src/data/exerciseData.js` 檔案中，找到 `bodyParts` 陣列：

```javascript
bodyParts: [
  { id: 'chest', name: '胸', icon: '?' },
  { id: 'biceps', name: '二頭肌', icon: '?' },
  // 在這裡增加新的身體部位
  { id: 'calves', name: '小腿', icon: '?' },  // 新增小腿
  { id: 'forearms', name: '前臂', icon: '?' }, // 新增前臂
]
```

### 2. 增加新的運動項目

在 `exercises` 物件中增加新的運動：

```javascript
exercises: {
  chest: [
    // 現有的胸部運動...
    {
      id: 'incline_bench_press',  // 新的運動 ID
      name: '上斜推胸',           // 運動名稱
      description: '針對上胸部的訓練動作', // 運動描述
      image: '/images/exercises/incline_bench_press.png', // 圖片路徑
      tips: [
        '調整長凳角度至30-45度',
        '啞鈴握在胸前，手臂彎曲',
        '向上推舉時呼氣',
        '控制下降速度'
      ]
    }
  ],
  // 為新身體部位增加運動
  calves: [
    {
      id: 'standing_calf_raise',
      name: '站姿提踵',
      description: '訓練小腿肌肉的基本動作',
      image: '/images/exercises/standing_calf_raise.png',
      tips: [
        '雙腳與肩同寬站立',
        '腳尖站在台階邊緣',
        '慢慢提起腳跟',
        '控制下降速度'
      ]
    }
  ]
}
```

### 3. 增加運動圖片

1. **準備圖片檔案**：
   - 格式：PNG（推薦）
   - 尺寸：300x200 像素或更大
   - 內容：清晰的運動動作示意圖

2. **放入圖片**：
   - 將圖片檔案放入 `public/images/exercises/` 資料夾
   - 檔案名稱要與程式碼中的路徑一致

### 4. 修改注意事項

在 `tips` 陣列中增加或修改注意事項：

```javascript
tips: [
  '保持身體成一直線，從頭到腳跟',
  '下降時胸部要貼近地面',
  '上升時手臂要完全伸直',
  '呼吸要規律，下降時吸氣，上升時呼氣',
  '新增的注意事項...'  // 在這裡增加新的注意事項
]
```

## ? 部署修改

### 步驟 1：測試修改
```bash
npm start
```

### 步驟 2：提交修改
```bash
git add .
git commit -m "Add new exercises and tips"
git push
```

### 步驟 3：自動部署
- Netlify 會自動重新部署
- 等待 1-2 分鐘
- 檢查網站是否更新

## ? 修改範例

### 增加新的胸部運動：
```javascript
{
  id: 'decline_pushup',
  name: '下斜伏地挺身',
  description: '針對下胸部的伏地挺身變體',
  image: '/images/exercises/decline_pushup.png',
  tips: [
    '雙腳放在高處，雙手撐地',
    '身體保持直線',
    '下降時胸部要貼近地面',
    '這個動作對下胸部刺激更強'
  ]
}
```

### 增加新的身體部位：
```javascript
{ id: 'core', name: '核心', icon: '?' }
```

### 為新身體部位增加運動：
```javascript
core: [
  {
    id: 'plank',
    name: '平板支撐',
    description: '訓練核心穩定的基本動作',
    image: '/images/exercises/plank.png',
    tips: [
      '手肘撐地，身體成一直線',
      '收緊核心，保持呼吸',
      '避免臀部下沉或抬高',
      '可以從30秒開始，逐漸增加時間'
    ]
  }
]
```

## ?? 注意事項

1. **檔案命名**：圖片檔案名稱要與程式碼中的路徑完全一致
2. **ID 唯一性**：每個運動的 ID 必須是唯一的
3. **圖片格式**：建議使用 PNG 格式
4. **測試**：修改後要測試所有功能是否正常

## ? 快速修改流程

1. 編輯 `src/data/exerciseData.js`
2. 準備並放入圖片檔案
3. 執行 `npm start` 測試
4. 提交並推送修改
5. 等待 Netlify 自動部署
6. 檢查網站更新

這樣您就可以隨時增加新的健身動作和注意事項了！ 