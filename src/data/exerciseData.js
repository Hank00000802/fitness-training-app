export const exerciseData = {
  bodyParts: [
    { id: 'chest', name: '胸', icon: '💪' },
    { id: 'biceps', name: '二頭肌', icon: '💪' },
    { id: 'triceps', name: '三頭肌', icon: '💪' },
    { id: 'shoulders', name: '肩', icon: '🏋️' },
    { id: 'back', name: '背部', icon: '🏋️' },
    { id: 'abs', name: '腹部', icon: '🔥' },
    { id: 'legs', name: '腿', icon: '🦵' },
    { id: 'glutes', name: '臀部', icon: '🍑' }
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
      },
      {
        id: 'cable_crossover',
        name: '繩索夾胸',
        description: '使用繩索進行胸部夾胸訓練',
        image: '/images/exercises/cable_crossover.png',
        tips: [
          '滑輪設高位，雙手持繩向前夾',
          '手肘微彎，集中胸肌發力',
          '控制動作速度，避免慣性',
          '夾胸時感受胸肌收縮'
        ]
      },
      {
        id: 'low_cable_crossover',
        name: '低位繩索上斜夾胸',
        description: '使用低位繩索進行上斜夾胸訓練',
        image: '/images/exercises/low_cable_crossover.png',
        tips: [
          '滑輪設低位，斜向上夾至胸前',
          '夾到最終點暫停一秒',
          '避免肩膀代償',
          '專注胸肌發力'
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
      },
      {
        id: 'rope_cable_curl',
        name: '繩索彎舉',
        description: '使用繩索進行二頭肌彎舉訓練',
        image: '/images/exercises/rope_cable_curl.png',
        tips: [
          '低滑輪位置，手肘固定',
          '專注收縮肱二頭肌',
          '過程慢速，不要用慣性甩',
          '控制動作節奏'
        ]
      },
      {
        id: 'single_arm_rope_curl',
        name: '單手繩索彎舉',
        description: '使用繩索進行單手彎舉訓練',
        image: '/images/exercises/single_arm_rope_curl.png',
        tips: [
          '核心保持穩定',
          '左右手輪流做有助平衡發展',
          '專注單側肌肉收縮',
          '控制動作速度'
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
      },
      {
        id: 'rope_triceps_pushdown',
        name: '繩索下壓',
        description: '使用繩索進行三頭肌下壓訓練',
        image: '/images/exercises/rope_triceps_pushdown.png',
        tips: [
          '手肘固定、靠近身體',
          '往下壓時繩索打開呈Y字型',
          '過程中核心出力防止身體晃動',
          '控制下降速度'
        ]
      },
      {
        id: 'overhead_rope_extension',
        name: '過頭伸展',
        description: '使用繩索進行過頭三頭肌伸展',
        image: '/images/exercises/overhead_rope_extension.png',
        tips: [
          '面對滑輪、手持繩索高舉',
          '手肘穩定不外開',
          '往前上方伸展至完全伸直',
          '避免拱背'
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
      },
      {
        id: 'cable_lateral_raise',
        name: '繩索側平舉',
        description: '使用繩索進行側平舉訓練',
        image: '/images/exercises/cable_lateral_raise.png',
        tips: [
          '使用單手方式、繩索設低位',
          '動作慢做、手肘微彎至肩高即可',
          '專注中束三角肌發力',
          '避免聳肩'
        ]
      },
      {
        id: 'cable_front_raise',
        name: '繩索前平舉',
        description: '使用繩索進行前平舉訓練',
        image: '/images/exercises/cable_front_raise.png',
        tips: [
          '雙手或單手皆可',
          '動作自然、勿聳肩',
          '集中前束出力',
          '控制動作速度'
        ]
      },
      {
        id: 'dumbbell_lateral_raise',
        name: '啞鈴側平舉',
        description: '以啞鈴訓練中束三角肌的側向抬舉',
        image: '/images/exercises/dumbbell_lateral_raise.png',
        tips: [
          '避免將啞鈴抬過肩膀高度，減少肩關節壓力',
          '身體直立、核心收緊，避免聳肩與搖晃借力',
          '手肘微彎，略往側前抬至肩高即可',
          '初學者建議使用輕重量，專注感受中束出力'
        ]
      },
      {
        id: 'dumbbell_front_raise',
        name: '啞鈴前平舉',
        description: '以啞鈴訓練前三角肌的前向抬舉',
        image: '/images/exercises/dumbbell_front_raise.png',
        tips: [
          '上舉不高於肩膀高度',
          '核心收緊，避免以身體擺動借力',
          '可採單手交替方式以降低疲勞並提高控制度',
          '下放全程控制，勿快速落下'
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
      },
      {
        id: 'face_pull',
        name: '繩索面拉',
        description: '使用繩索進行面拉訓練',
        image: '/images/exercises/face_pull.png',
        tips: [
          '繩索設肩高',
          '雙手拉至耳旁、手肘打開',
          '目標鍛鍊斜方肌與後三角',
          '控制動作節奏'
        ]
      },
      {
        id: 'cable_pulldown',
        name: '繩索下拉',
        description: '使用繩索進行下拉訓練',
        image: '/images/exercises/cable_pulldown.png',
        tips: [
          '坐姿或站姿都可',
          '繩索往下拉至鎖骨高度',
          '控制肩胛骨收縮',
          '專注背部發力'
        ]
      },
      {
        id: 'single_arm_dumbbell_row',
        name: '單手啞鈴划船',
        description: '以單手支撐進行啞鈴划船，著重闊背肌與菱形肌收縮',
        image: '/images/exercises/single_arm_dumbbell_row.png',
        tips: [
          '軀幹保持中立與穩定，避免身體旋轉借力',
          '肘沿身側路徑往後上拉至下肋位置，頂端主動夾背',
          '下放至手臂近乎完全伸展並控制肩胛，不聳肩',
          '以穩定節奏進行，重點放在背部發力而非手臂'
        ]
      },
      {
        id: 'dumbbell_bent_over_row',
        name: '雙手啞鈴划船',
        description: '前傾姿勢同時以雙手持啞鈴進行划船，加強整體背部厚度',
        image: '/images/exercises/dumbbell_bent_over_row.png',
        tips: [
          '髖關節折髖前傾，背部打直維持中立脊椎，核心收緊',
          '啞鈴沿大腿兩側向上拉至下肋位置，肘朝後下拉不外張',
          '頂端夾背，下降全程控制，避免甩動與聳肩',
          '重量以可控為主，動作範圍完整'
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
      },
      {
        id: 'pallof_press',
        name: '繩索抗旋轉推',
        description: '使用繩索進行抗旋轉訓練',
        image: '/images/exercises/pallof_press.png',
        tips: [
          '側對滑輪、雙手推出繩索',
          '維持軀幹穩定',
          '核心需全程出力避免身體轉動',
          '控制動作速度'
        ]
      },
      {
        id: 'woodchopper',
        name: '繩索木工轉體',
        description: '使用繩索進行轉體訓練',
        image: '/images/exercises/woodchopper.png',
        tips: [
          '從高→低 或 低→高 方向轉體',
          '骨盆穩定',
          '扭轉出力來自腰部與腹斜肌',
          '控制轉體速度'
        ]
      },
      {
        id: 'dumbbell_russian_twist',
        name: '啞鈴俄羅斯轉體',
        description: '手持啞鈴進行軀幹旋轉，強化腹斜肌與核心抗旋轉能力',
        image: '/images/exercises/dumbbell_russian_twist.png',
        tips: [
          '挺胸收腹、背部打直，避免含胸駝背',
          '腳跟是否離地依能力調整，初學者可雙腳放地，進階可抬腳提高負荷',
          '動作控制、避免過快，切勿靠慣性甩動',
          '帶動旋轉的是軀幹而非單純手臂移動，確保核心參與'
        ]
      },
      {
        id: 'single_arm_dumbbell_farmers_walk',
        name: '啞鈴單邊農夫走',
        description: '單手持啞鈴行走，訓練握力、肩部穩定與核心抗側屈',
        image: '/images/exercises/single_arm_dumbbell_farmers_walk.png',
        tips: [
          '站姿挺直、肩膀對齊，避免單邊聳肩或下垂',
          '核心收緊避免身體歪斜，抵抗啞鈴造成的不平衡',
          '步伐穩定、避免快步或跳動',
          '另一手自然垂放或輕微外展，避免刻意擺動來平衡',
          '啞鈴自然下垂，避免貼身摩擦'
        ]
      },
      {
        id: 'dumbbell_side_bend',
        name: '啞鈴側屈',
        description: '單手持啞鈴側向屈曲軀幹，強調腹斜肌發力',
        image: '/images/exercises/dumbbell_side_bend.png',
        tips: [
          '只做側屈不前傾或後仰，維持同一平面活動',
          '避免聳肩，肩膀放鬆減少不必要壓力',
          '動作範圍適中，勿為求幅度過大而壓迫腰椎',
          '來回皆需控制，避免反彈彈回',
          '可雙手各持啞鈴作為進階，但初學建議單邊持鈴以增加對側穩定'
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