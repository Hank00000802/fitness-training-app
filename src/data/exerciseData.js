export const exerciseData = {
  bodyParts: [
    { id: 'chest', name: '胸部', icon: '💪' },
    { id: 'biceps', name: '二頭肌', icon: '💪' },
    { id: 'triceps', name: '三頭肌', icon: '💪' },
    { id: 'shoulders', name: '肩膀', icon: '🏋️' },
    { id: 'back', name: '背部', icon: '🏋️' },
    { id: 'abs', name: '腹肌', icon: '🏃' },
    { id: 'legs', name: '腿部', icon: '🏃' },
    { id: 'glutes', name: '臀部', icon: '🍑' }
  ],
  exercises: {
    chest: [
      {
        id: 'pushup',
        name: '伏地挺身',
        description: '經典徒手訓練，強化胸大肌、三頭肌與核心穩定。',
        image: '/images/exercises/pushup.png',
        tips: [
          '身體保持一直線，胸部靠近地面再推起。',
          '控制下放速度，避免完全放鬆失去張力。',
          '窄距離偏重三頭肌，寬距離偏重胸大肌。',
          '入門者可先做膝蓋版本再進階。'
        ]
      },
      {
        id: 'dumbbell_bench_press',
        name: '啞鈴臥推',
        description: '啞鈴臥推提供更大活動幅度，訓練胸大肌與穩定肌群。',
        image: '/images/exercises/dumbbell_bench_press.png',
        tips: [
          '肩胛骨收穩，啞鈴至胸旁再推起。',
          '6-12 次為一組可兼顧力量與肌肥大。',
          '雙手力量不均時可單臂交替。',
          '避免腰背過度拱起，核心收緊。'
        ]
      },
      {
        id: 'cable_crossover',
        name: '滑輪夾胸',
        description: '滑輪胸前夾收，強調胸大肌收縮與線條。',
        image: '/images/exercises/cable_crossover.png',
        tips: [
          '微彎手肘，從兩側往前合攏。',
          '選擇能感受張力的重量，避免甩動。',
          '動作末端稍作等長收縮。',
          '控制回放，不要讓重量彈回。'
        ]
      }
    ],
    biceps: [
      {
        id: 'bicep_curl',
        name: '二頭肌彎舉',
        description: '基礎二頭肌訓練，增強手臂尺寸與力量。',
        image: '/images/exercises/bicep_curl.png',
        tips: [
          '保持上臂穩定，避免身體晃動借力。',
          '手腕維持中立，專注二頭肌發力。',
          '控制下放速度增加張力時間。',
          '可交替或同時雙手進行。'
        ]
      },
      {
        id: 'hammer_curl',
        name: '槌式彎舉',
        description: '中立握法彎舉，強化前臂與二頭肌長頭，提升握力。',
        image: '/images/exercises/hammer_curl.png',
        tips: [
          '手臂貼身，上臂不動。',
          '頂點稍停，感受前臂與二頭肌收縮。',
          '可做交替或同時雙手。',
          '重量以可控為主，避免聳肩。'
        ]
      },
      {
        id: 'rope_cable_curl',
        name: '繩索彎舉',
        description: '繩索提供恆定拉力，增加肌肉收縮感受。',
        image: '/images/exercises/rope_cable_curl.png',
        tips: [
          '從底端拉起，專注二頭肌頂峰收縮。',
          '肘部固定於身側，避免前臂擺動。',
          '可調握把寬度改變刺激。',
          '重量以完整收放為原則。'
        ]
      }
    ],
    triceps: [
      {
        id: 'tricep_dip',
        name: '三頭肌撐體',
        description: '自體重量撐體，訓練三頭肌與肩帶穩定。',
        image: '/images/exercises/tricep_dip.png',
        tips: [
          '手肘朝後收，下降至上臂平行地面。',
          '核心收緊避免身體前傾過多。',
          '無法完成全程可用助力或彈力帶。',
          '控制節奏避免衝擊肩關節。'
        ]
      },
      {
        id: 'overhead_tricep_extension',
        name: '頭上臂屈伸',
        description: '啞鈴或繩索頭上屈伸，強化三頭肌長頭。',
        image: '/images/exercises/overhead_tricep_extension.png',
        tips: [
          '手肘收緊，保持肩膀穩定。',
          '下放至可感受拉伸的位置再推起。',
          '避免腰背過度反折，核心收緊。',
          '重量以可控為主，確保全程張力。'
        ]
      },
      {
        id: 'rope_triceps_pushdown',
        name: '繩索下拉',
        description: '繩索下拉，針對三頭肌外側與內側頭。',
        image: '/images/exercises/rope_triceps_pushdown.png',
        tips: [
          '手肘貼身固定，前臂下壓至完全伸直。',
          '動作底端可微外展繩索增加收縮。',
          '避免聳肩或身體前傾借力。',
          '重量以能維持穩定軌跡為主。'
        ]
      }
    ],
    shoulders: [
      {
        id: 'shoulder_press',
        name: '肩推',
        description: '肩部推舉，鍛鍊前三角與整體肩帶穩定。',
        image: '/images/exercises/shoulder_press.png',
        tips: [
          '起始時手肘略低於肩。',
          '推起時不鎖死手肘，維持張力。',
          '核心收緊避免腰椎過度伸展。',
          '可坐姿或站姿依需求選擇。'
        ]
      },
      {
        id: 'cable_lateral_raise',
        name: '繩索側平舉',
        description: '繩索側平舉持續張力，專注肩中束。',
        image: '/images/exercises/cable_lateral_raise.png',
        tips: [
          '手肘微彎，側向抬至肩高。',
          '身體保持穩定，避免晃動借力。',
          '重量輕中為主，尋找肩部灼熱感。',
          '下降時控制速度。'
        ]
      },
      {
        id: 'dumbbell_front_raise',
        name: '啞鈴前平舉',
        description: '前束訓練，強化肩前側與穩定。',
        image: '/images/exercises/dumbbell_front_raise.png',
        tips: [
          '啞鈴抬至肩高或略高。',
          '掌心向下或相對皆可。',
          '避免聳肩，保持核心緊繃。',
          '可單臂或交替進行。'
        ]
      }
    ],
    back: [
      {
        id: 'pull_up',
        name: '引體向上',
        description: '徒手拉力訓練，鍛鍊背闊肌與上背。',
        image: '/images/exercises/pull_up.png',
        tips: [
          '肩胛下沉後再發力上拉。',
          '胸口朝橫桿，避免聳肩。',
          '全程控制，不要猛衝借力。',
          '無法完成可用彈力帶輔助。'
        ]
      },
      {
        id: 'face_pull',
        name: '臉拉',
        description: '繩索臉拉，強化後束與肩袖穩定。',
        image: '/images/exercises/face_pull.png',
        tips: [
          '繩索拉向眉眼位置，手肘外展。',
          '專注肩胛後收與下壓。',
          '保持頸部放鬆避免聳肩。',
          '適合中輕重量高次數。'
        ]
      },
      {
        id: 'cable_pulldown',
        name: '滑輪下拉',
        description: '滑輪下拉，針對背闊肌與上背厚度。',
        image: '/images/exercises/cable_pulldown.png',
        tips: [
          '起始時肩胛下沉，胸口挺起。',
          '拉至鎖骨或胸上緣位置。',
          '避免身體後仰過多借力。',
          '控制回放，保持張力。'
        ]
      }
    ],
    abs: [
      {
        id: 'crunch',
        name: '仰臥捲腹',
        description: '基礎腹肌收縮訓練，著重上腹。',
        image: '/images/exercises/crunch.png',
        tips: [
          '下背貼地，慢慢捲起上身。',
          '視線朝天花板，避免拉扯頸部。',
          '動作幅度不需過大，專注收縮。',
          '可調整手位置改變難度。'
        ]
      },
      {
        id: 'pallof_press',
        name: 'Pallof Press 抗旋轉推舉',
        description: '利用滑輪或彈力帶抗旋轉，強化核心穩定。',
        image: '/images/exercises/pallof_press.png',
        tips: [
          '雙手於胸前推直，抗拒側向拉力。',
          '保持骨盆與胸口朝前。',
          '膝微彎，核心收緊。',
          '可調整站距或重量增加挑戰。'
        ]
      },
      {
        id: 'dumbbell_russian_twist',
        name: '俄式扭轉',
        description: '坐姿扭轉，訓練腹外斜與核心穩定。',
        image: '/images/exercises/dumbbell_russian_twist.png',
        tips: [
          '上身微後傾，背部保持中立。',
          '左右扭轉時目視器材或手。',
          '動作平順，避免甩動。',
          '腳可抬起增加難度。'
        ]
      }
    ],
    legs: [
      {
        id: 'squat',
        name: '深蹲',
        description: '下肢基礎訓練，鍛鍊股四頭、臀部與核心。',
        image: '/images/exercises/squat.png',
        tips: [
          '腳尖略外開，膝蓋隨腳尖方向。',
          '下蹲時臀部向後坐，背部維持中立。',
          '站起時用腳跟發力，避免膝內夾。',
          '可依需求使用槓鈴或徒手。'
        ]
      }
    ],
    glutes: [
      {
        id: 'glute_bridge',
        name: '臀橋',
        description: '仰臥抬臀動作，針對臀大肌啟動與強化。',
        image: '/images/exercises/glute_bridge.png',
        tips: [
          '膝蓋約 90 度，腳跟踩實。',
          '抬起臀部至膝肩成一直線。',
          '頂點稍停並收縮臀部。',
          '避免下背過度拱起。'
        ]
      }
    ]
  }
};

// In-memory store for custom exercises loaded from localStorage
let dynamicExercises = {};

const loadCustomExercises = () => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const stored = window.localStorage.getItem('customExercises');
    dynamicExercises = stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Failed to load custom exercises:', err);
    dynamicExercises = {};
  }
};

const saveCustomExercises = () => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem('customExercises', JSON.stringify(dynamicExercises));
  } catch (err) {
    console.error('Failed to save custom exercises:', err);
  }
};

export const addCustomExercise = (bodyPartId, exerciseData) => {
  const newExercise = {
    ...exerciseData,
    id: `custom_${Date.now()}`,
    isCustom: true
  };
  const existing = dynamicExercises[bodyPartId] || [];
  dynamicExercises[bodyPartId] = [...existing, newExercise];
  saveCustomExercises();
  return newExercise;
};

export const getExercisesForBodyPart = (bodyPartId) => {
  const base = exerciseData.exercises[bodyPartId] || [];
  const custom = dynamicExercises[bodyPartId] || [];
  return [...base, ...custom];
};

export const deleteCustomExercise = (bodyPartId, exerciseId) => {
  if (!dynamicExercises[bodyPartId]) {
    return;
  }
  const list = dynamicExercises[bodyPartId];
  const newList = list.filter(e => e.id !== exerciseId);
  if (newList.length) {
    dynamicExercises[bodyPartId] = newList;
  } else {
    delete dynamicExercises[bodyPartId];
  }
  saveCustomExercises();
};

// Load persisted custom exercises on module import
loadCustomExercises();