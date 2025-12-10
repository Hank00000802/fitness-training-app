export const exerciseData = {
  bodyParts: [
    { id: 'chest', name: '胸', icon: '💪' },
    { id: 'biceps', name: '二頭肌', icon: '💪' },
    { id: 'triceps', name: '三頭肌', icon: '💪' },
    { id: 'shoulders', name: '肩', icon: '👐' },
    { id: 'back', name: '背', icon: '👐' },
    { id: 'abs', name: '腹', icon: '🏋️' },
    { id: 'legs', name: '腿', icon: '🏃' },
    { id: 'glutes', name: '臀', icon: '🏋️' }
  ],
  exercises: {
    chest: [
      {
        id: 'pushup',
        name: '伏地挺身',
        description: '經典徒手胸推，核心收緊、背部維持平直。',
        image: '/images/exercises/pushup.png',
        tips: [
          '雙手略寬於肩，手肘約 45 度，避免過度外張。',
          '身體成一直線，避免臀部下垂或翹臀。',
          '下放控制到胸部接近地面後推起。',
          '推起時吐氣，避免手肘爆開。'
        ]
      },
      {
        id: 'dumbbell_bench_press',
        name: '啞鈴平板臥推',
        description: '平板上以啞鈴從胸部位置推起。',
        image: '/images/exercises/dumbbell_bench_press.png',
        tips: [
          '腳踏穩、肩胛內收貼板保持穩定。',
          '手肘與軀幹約 45–60 度，避免過度外張。',
          '下放至胸部附近並保持控制。',
          '推起時手腕在手肘正上方。'
        ]
      },
      {
        id: 'diamond_pushup',
        name: '鑽石伏地挺身',
        description: '強調三頭與胸內側的伏地挺身變化。',
        image: '/images/exercises/diamond_pushup.png',
        tips: [
          '雙手靠近呈鑽石形放在胸下方。',
          '手肘貼身，避免外張。',
          '頭到腳維持一直線。',
          '下放控制、推起吐氣。'
        ]
      },
      {
        id: 'cable_crossover',
        name: '滑輪夾胸',
        description: '利用滑輪做胸飛鳥動作。',
        image: '/images/exercises/cable_crossover.png',
        tips: [
          '滑輪高度略高於肩。',
          '手肘微彎並保持固定角度。',
          '雙手在胸前合攏並在頂點擠壓胸肌。',
          '回放控制，不要聳肩。'
        ]
      },
      {
        id: 'low_cable_crossover',
        name: '下滑輪夾胸',
        description: '從低點向上夾的胸飛鳥，強調上胸。',
        image: '/images/exercises/low_cable_crossover.png',
        tips: [
          '滑輪設定低點，向前一步保持張力。',
          '手臂微彎，向上向內弧形夾胸。',
          '頂端擠胸，避免過度拱腰。',
          '離心控制，核心收緊。'
        ]
      }
    ],
    biceps: [
      {
        id: 'bicep_curl',
        name: '啞鈴彎舉',
        description: '手心朝上彎舉啞鈴訓練二頭肌。',
        image: '/images/exercises/bicep_curl.png',
        tips: [
          '手肘貼近身體，避免晃動。',
          '控制彎舉，手腕中立不內外折。',
          '頂端擠壓，慢速下放。',
          '肩放鬆、胸打開。'
        ]
      },
      {
        id: 'hammer_curl',
        name: '槌式彎舉',
        description: '中立握彎舉，強調肱肌與前臂。',
        image: '/images/exercises/hammer_curl.png',
        tips: [
          '手心相對，全程保持。',
          '手肘靠身，避免身體晃動。',
          '控制上舉，勿猛拉重量。',
          '慢速下放至接近完全伸直但不鎖死。'
        ]
      },
      {
        id: 'rope_cable_curl',
        name: '繩索彎舉',
        description: '使用繩索附件的滑輪彎舉，張力持續。',
        image: '/images/exercises/rope_cable_curl.png',
        tips: [
          '手肘貼身固定，肩部盡量不動。',
          '彎舉頂端可微分開繩索。',
          '手腕保持中立，避免過度屈曲。',
          '控制回放至接近伸直。'
        ]
      },
      {
        id: 'single_arm_rope_curl',
        name: '單手繩索彎舉',
        description: '單側繩索彎舉，可修正左右差異。',
        image: '/images/exercises/single_arm_rope_curl.png',
        tips: [
          '站姿穩定，必要時前後錯步。',
          '手肘靠近肋骨，避免身體扭轉。',
          '平順彎舉，頂端短暫停留。',
          '控制下放，勿直接放掉。'
        ]
      }
    ],
    triceps: [
      {
        id: 'tricep_dip',
        name: '椅上三頭撐體',
        description: '利用椅凳做自重撐體，訓練三頭肌。',
        image: '/images/exercises/tricep_dip.png',
        tips: [
          '雙手在肩下，手指朝前。',
          '胸口打開，肩膀下沉遠離耳朵。',
          '下放至手肘約 90 度，若不適勿過深。',
          '伸肘推起但避免猛力鎖死。'
        ]
      },
      {
        id: 'overhead_tricep_extension',
        name: '頭頂三頭伸展',
        description: '頭上啞鈴/滑輪伸展，強調三頭長頭。',
        image: '/images/exercises/overhead_tricep_extension.png',
        tips: [
          '手肘朝前，避免外張。',
          '控制下放到頭後，肋骨收好不外翻。',
          '伸直手肘但避免過度反張。',
          '核心收緊保護下背。'
        ]
      },
      {
        id: 'rope_triceps_pushdown',
        name: '繩索下壓',
        description: '繩索滑輪下壓，重點在三頭伸展。',
        image: '/images/exercises/rope_triceps_pushdown.png',
        tips: [
          '手肘貼身固定，肩部少動。',
          '下壓到底可微微分開繩索。',
          '手腕中立，勿轉動手腕代償。',
          '回放控制速度。'
        ]
      },
      {
        id: 'overhead_rope_extension',
        name: '繩索頭頂伸展',
        description: '滑輪繩索於頭頂後方伸展，啟動三頭長頭。',
        image: '/images/exercises/overhead_rope_extension.png',
        tips: [
          '背對滑輪，手肘抬高且穩定。',
          '控制下放，身體可微前傾以平衡。',
          '伸直並擠壓三頭，感受收縮。',
          '避免下背拱起，核心收緊。'
        ]
      }
    ],
    shoulders: [
      {
        id: 'shoulder_press',
        name: '肩推',
        description: '將重量推過頭頂訓練三角肌。',
        image: '/images/exercises/shoulder_press.png',
        tips: [
          '起始手肘略在器械前方。',
          '推舉時避免下背過度拱起。',
          '肋骨收好，核心與臀部出力穩定。',
          '下放控制到下巴/耳朵附近。'
        ]
      },
      {
        id: 'cable_lateral_raise',
        name: '滑輪側平舉',
        description: '滑輪側平舉，讓張力持續在中束三角肌。',
        image: '/images/exercises/cable_lateral_raise.png',
        tips: [
          '手肘微彎並固定角度。',
          '舉到肩高即可，避免聳肩。',
          '以手肘帶動，手略在身前。',
          '回放控制，輕中重量即可。'
        ]
      },
      {
        id: 'cable_front_raise',
        name: '滑輪前平舉',
        description: '滑輪前平舉，訓練前三角肌。',
        image: '/images/exercises/cable_front_raise.png',
        tips: [
          '手掌向下或中立，手肘微彎。',
          '舉到肩高即可。',
          '避免身體借力擺動，每下控制。',
          '慢速下放維持張力。'
        ]
      },
      {
        id: 'dumbbell_lateral_raise',
        name: '啞鈴側平舉',
        description: '啞鈴側平舉，主要訓練中束三角肌。',
        image: '/images/exercises/dumbbell_lateral_raise.png',
        tips: [
          '手肘微彎，稍微往身前舉到肩高。',
          '避免手肘打直鎖死。',
          '不甩動，用控制的節奏完成。',
          '輕重量搭配標準姿勢就很有效。'
        ]
      },
      {
        id: 'dumbbell_front_raise',
        name: '啞鈴前平舉',
        description: '啞鈴前平舉，訓練前三角肌。',
        image: '/images/exercises/dumbbell_front_raise.png',
        tips: [
          '舉到肩高即可，避免用慣性甩起。',
          '核心收緊，不要後仰。',
          '疲勞時可交替手臂保持姿勢。',
          '控制下放，手腕中立。'
        ]
      }
    ],
    back: [
      {
        id: 'pull_up',
        name: '引體向上',
        description: '自體重量垂直拉，訓練背闊肌與上背。',
        image: '/images/exercises/pull_up.png',
        tips: [
          '握距略寬於肩，肩膀下沉收緊。',
          '拉時胸口朝槓，避免仰頭。',
          '控制下放接近完全伸直。',
          '全程標準動作，避免踢腿借力。'
        ]
      },
      {
        id: 'face_pull',
        name: '臉拉',
        description: '繩索拉至臉部高度，訓練後束與外旋肌群。',
        image: '/images/exercises/face_pull.png',
        tips: [
          '手肘抬高，繩索拉向額頭/眼睛高度。',
          '夾緊肩胛骨。',
          '頸部中立，避免聳肩。',
          '控制回放，建議用輕重量。'
        ]
      },
      {
        id: 'cable_pulldown',
        name: '滑輪下拉',
        description: '坐姿滑輪下拉，強調背闊肌發力。',
        image: '/images/exercises/cable_pulldown.png',
        tips: [
          '握距舒適，微微後傾即可。',
          '拉到上胸位置，手肘向下發力。',
          '避免用慣性猛拉，速度可控。',
          '頂端可讓肩胛前伸，開始拉時再下沉。'
        ]
      },
      {
        id: 'single_arm_dumbbell_row',
        name: '單手啞鈴划船',
        description: '單側划船，使用凳子支撐，訓練背闊與中背。',
        image: '/images/exercises/single_arm_dumbbell_row.png',
        tips: [
          '一手一膝支撐在凳上，背保持平直。',
          '啞鈴拉向臀部位置，以手肘帶動。',
          '頂端停頓一下，避免身體扭轉。',
          '控制下放到背肌被拉伸的位置。'
        ]
      },
      {
        id: 'dumbbell_bent_over_row',
        name: '啞鈴俯身划船',
        description: '髖關節折髖俯身划船，訓練背闊與菱形肌。',
        image: '/images/exercises/dumbbell_bent_over_row.png',
        tips: [
          '折髖俯身，脊椎中立。',
          '拉向下肋或髖部線。',
          '上背勿拱，核心出力。',
          '控制下放，避免用力猛拉。'
        ]
      }
    ],
    abs: [
      {
        id: 'crunch',
        name: '仰臥捲腹',
        description: '基本腹部屈曲動作。',
        image: '/images/exercises/crunch.png',
        tips: [
          '下背貼地。',
          '帶起肩膀，不要扯脖子。',
          '捲起時吐氣。',
          '下放控制，小幅度即可。'
        ]
      },
      {
        id: 'pallof_press',
        name: 'Pallof Press 抗旋轉推舉',
        description: '利用滑輪/彈力帶抗旋轉，訓練核心穩定。',
        image: '/images/exercises/pallof_press.png',
        tips: [
          '側對滑輪站立，雙腳與肩同寬。',
          '向前推直，抵抗旋轉拉力。',
          '肋骨下收、臀部收緊保持穩定。',
          '可短暫停留，再控制收回。'
        ]
      },
      {
        id: 'woodchopper',
        name: '滑輪伐木動作',
        description: '斜向砍木動作，訓練腹斜肌與核心。',
        image: '/images/exercises/woodchopper.png',
        tips: [
          '依方向調整滑輪高低位。',
          '以軀幹與髖部帶動旋轉，手臂相對直。',
          '核心收緊，避免下背過度伸展。',
          '上下兩段都要控制。'
        ]
      },
      {
        id: 'dumbbell_russian_twist',
        name: '啞鈴俄羅斯轉體',
        description: '坐姿持啞鈴的核心旋轉訓練。',
        image: '/images/exercises/dumbbell_russian_twist.png',
        tips: [
          '坐姿挺直，微微後傾，脊椎中立。',
          '以軀幹旋轉而非只動手臂。',
          '腳可放地，想加強可抬腳。',
          '動作要控制，避免甩動重量。'
        ]
      },
      {
        id: 'single_arm_dumbbell_farmers_walk',
        name: '單手農夫走路',
        description: '單側負重行走，挑戰核心抗側屈穩定。',
        image: '/images/exercises/single_arm_dumbbell_farmers_walk.png',
        tips: [
          '站直，雙肩維持水平。',
          '核心收緊，避免身體傾斜。',
          '步伐穩定、不要快跑或跳動。',
          '啞鈴自然垂放，勿刻意貼腿摩擦。'
        ]
      },
      {
        id: 'dumbbell_side_bend',
        name: '啞鈴側彎',
        description: '持啞鈴做側屈，訓練腹斜肌。',
        image: '/images/exercises/dumbbell_side_bend.png',
        tips: [
          '啞鈴沿腿側滑動做側屈。',
          '避免前傾或後仰，保持純側屈。',
          '幅度勿過大，以免壓迫腰椎。',
          '左右交替，雙向都要控制。'
        ]
      }
    ],
    legs: [
      {
        id: 'squat',
        name: '深蹲',
        description: '基本下肢動作，訓練股四頭與臀肌。',
        image: '/images/exercises/squat.png',
        tips: [
          '雙腳約肩寬，腳尖微外開。',
          '膝蓋跟腳尖方向一致，避免內夾。',
          '胸口抬、脊椎中立。',
          '深度可控，腳中段發力站起。'
        ]
      }
    ],
    glutes: [
      {
        id: 'glute_bridge',
        name: '臀橋',
        description: '地面上做髖伸展，主訓臀部。',
        image: '/images/exercises/glute_bridge.png',
        tips: [
          '雙腳平放，膝約 90 度。',
          '腳跟發力上推，頂端擠臀。',
          '避免下背過度拱起，肋骨收好。',
          '控制下放，保持張力。'
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

// Load persisted custom exercises on module import
loadCustomExercises();