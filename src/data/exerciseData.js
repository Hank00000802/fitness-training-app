export const exerciseData = {
  bodyParts: [
    { id: 'chest', name: '胸', icon: '💪' },
    { id: 'biceps', name: '二頭肌', icon: '💪' },
    { id: 'triceps', name: '三頭肌', icon: '💪' },
    { id: 'shoulders', name: '肩', icon: '💪' },
    { id: 'back', name: '背部', icon: '💪' },
    { id: 'abs', name: '腹部', icon: '💪' },
    { id: 'legs', name: '腿', icon: '💪' },
    { id: 'glutes', name: '臀部', icon: '💪' }
  ],
  exercises: {
    chest: [
      {
        id: 'pushup',
        name: '伏地挺身',
        description: '經典的胸部訓練動作',
        image: '/images/exercises/pushup.png',
        tips: [
          '保持身體成一直線，從頭到腳跟',
          '下降時胸部要貼近地面',
          '上升時手臂要完全伸直',
          '呼吸要規律，下降時吸氣，上升時呼氣'
        ]
      },
      {
        id: 'dumbbell_bench_press',
        name: '躺臥推胸 - 啞鈴',
        description: '使用啞鈴進行胸部推舉',
        image: '/images/exercises/dumbbell_bench_press.png',
        tips: [
          '躺平在長凳上，雙腳穩固踩地',
          '啞鈴握在胸前，手臂彎曲成90度',
          '向上推舉時呼氣，下降時吸氣',
          '控制動作速度，避免快速彈跳'
        ]
      },
      {
        id: 'diamond_pushup',
        name: '鑽石伏地挺身',
        description: '針對三頭肌的進階伏地挺身',
        image: '/images/exercises/diamond_pushup.png',
        tips: [
          '雙手形成鑽石形狀放在胸前',
          '身體保持直線，核心收緊',
          '下降時胸部要觸碰到手',
          '這個動作對三頭肌刺激更強'
        ]
      }
    ],
    biceps: [
      {
        id: 'bicep_curl',
        name: '啞鈴彎舉',
        description: '經典的二頭肌訓練動作',
        image: '/images/exercises/bicep_curl.png',
        tips: [
          '站直，啞鈴握在身體兩側',
          '彎舉時保持手肘固定',
          '控制下降速度，避免快速放下',
          '避免身體搖擺來借力'
        ]
      },
      {
        id: 'hammer_curl',
        name: '錘式彎舉',
        description: '針對前臂和二頭肌的訓練',
        image: '/images/exercises/hammer_curl.png',
        tips: [
          '啞鈴握成錘子形狀',
          '動作過程中保持手腕穩定',
          '這個動作對前臂也有很好的訓練效果',
          '可以單手或雙手交替進行'
        ]
      }
    ],
    triceps: [
      {
        id: 'tricep_dip',
        name: '三頭肌下壓',
        description: '使用自身體重訓練三頭肌',
        image: '/images/exercises/tricep_dip.png',
        tips: [
          '雙手撐在椅子或檯面上',
          '身體下降時保持手肘靠近身體',
          '上升時手臂要完全伸直',
          '可以調整腳的位置來改變難度'
        ]
      },
      {
        id: 'overhead_tricep_extension',
        name: '過頭三頭肌伸展',
        description: '使用啞鈴進行三頭肌訓練',
        image: '/images/exercises/overhead_tricep_extension.png',
        tips: [
          '啞鈴舉過頭頂，雙手握住',
          '只彎曲手肘，前臂向後下降',
          '伸展時呼氣，彎曲時吸氣',
          '保持上臂固定不動'
        ]
      }
    ],
    shoulders: [
      {
        id: 'shoulder_press',
        name: '肩推',
        description: '訓練三角肌的經典動作',
        image: '/images/exercises/shoulder_press.png',
        tips: [
          '啞鈴舉到肩膀高度',
          '向上推舉時呼氣',
          '控制下降速度',
          '避免過度後仰'
        ]
      }
    ],
    back: [
      {
        id: 'pull_up',
        name: '引體向上',
        description: '訓練背部和手臂的複合動作',
        image: '/images/exercises/pull_up.png',
        tips: [
          '雙手握槓，寬度略寬於肩',
          '拉起身體時胸部要觸碰到槓',
          '下降時控制速度',
          '如果無法完成，可以使用輔助帶'
        ]
      }
    ],
    abs: [
      {
        id: 'crunch',
        name: '仰臥起坐',
        description: '訓練腹直肌的基本動作',
        image: '/images/exercises/crunch.png',
        tips: [
          '躺平，雙腳彎曲踩地',
          '雙手放在頭後，不要用力拉頭',
          '用腹肌力量抬起上半身',
          '控制下降速度'
        ]
      }
    ],
    legs: [
      {
        id: 'squat',
        name: '深蹲',
        description: '訓練下半身的複合動作',
        image: '/images/exercises/squat.png',
        tips: [
          '雙腳與肩同寬站立',
          '下蹲時膝蓋不要超過腳尖',
          '保持背部挺直',
          '可以加入啞鈴增加難度'
        ]
      }
    ],
    glutes: [
      {
        id: 'glute_bridge',
        name: '臀橋',
        description: '針對臀部的訓練動作',
        image: '/images/exercises/glute_bridge.png',
        tips: [
          '躺平，雙腳彎曲踩地',
          '抬起臀部，形成橋狀',
          '保持核心收緊',
          '可以單腳進行增加難度'
        ]
      }
    ]
  }
}; 