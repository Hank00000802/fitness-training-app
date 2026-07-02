import localforage from 'localforage';

const exerciseStore = localforage.createInstance({ name: 'fitnessApp', storeName: 'exercises' });

export const exerciseData = {
  bodyParts: [
    { id: 'chest', name: 'Chest', icon: '🏋️‍♀️' },
    { id: 'biceps', name: 'Biceps', icon: '💪' },
    { id: 'triceps', name: 'Triceps', icon: '💪' },
    { id: 'shoulders', name: 'Shoulders', icon: '💪' },
    { id: 'back', name: 'Back', icon: '🏋️‍♀️' },
    { id: 'abs', name: 'Abs', icon: '🏋️‍♀️' },
    { id: 'legs', name: 'Legs', icon: '🦵' },
    { id: 'glutes', name: 'Glutes', icon: '🏋️‍♀️' }
  ],
  exercises: {
    chest: [
      {
        id: 'pushup',
        name: 'Push-Up',
        description: 'A bodyweight exercise that strengthens the chest, shoulders, and triceps while improving core stability.',
        image: '/images/exercises/pushup.png',
        tips: [
          'Keep your body in a straight line from head to heels.',
          'Lower your chest slowly and push up with control.',
          'Keep elbows at about a 45-degree angle to your torso.',
          'Engage your core throughout the movement.'
        ]
      },
      {
        id: 'dumbbell_bench_press',
        name: 'Dumbbell Bench Press',
        description: 'A pressing movement using dumbbells to build chest strength and improve muscle balance.',
        image: '/images/exercises/dumbbell_bench_press.png',
        tips: [
          'Keep your shoulder blades retracted and pressed into the bench.',
          'Use 6-12 reps per set for hypertrophy.',
          'Lower the dumbbells with control to chest level.',
          'Avoid locking out your elbows at the top.'
        ]
      },
      {
        id: 'cable_crossover',
        name: 'Cable Crossover',
        description: 'A cable exercise that emphasizes chest contraction and inner chest development.',
        image: '/images/exercises/cable_crossover.png',
        tips: [
          'Start with a slight forward lean and arms wide.',
          'Bring your hands together in a controlled arc.',
          'Squeeze your chest at the peak of the movement.',
          'Keep a slight bend in your elbows throughout.'
        ]
      }
    ],
    biceps: [
      {
        id: 'bicep_curl',
        name: 'Bicep Curl',
        description: 'An isolation exercise targeting the biceps for arm size and strength.',
        image: '/images/exercises/bicep_curl.png',
        tips: [
          'Keep your elbows close to your sides.',
          'Curl with control and avoid swinging.',
          'Squeeze at the top of the movement.',
          'Lower the weight slowly on the eccentric.'
        ]
      },
      {
        id: 'hammer_curl',
        name: 'Hammer Curl',
        description: 'A neutral-grip curl that targets the biceps and brachialis for thicker arms.',
        image: '/images/exercises/hammer_curl.png',
        tips: [
          'Keep your wrists neutral throughout.',
          'Avoid using momentum to lift the weight.',
          'Focus on a full range of motion.',
          'Control the descent of each rep.'
        ]
      },
      {
        id: 'rope_cable_curl',
        name: 'Rope Cable Curl',
        description: 'A cable curl using a rope attachment for constant tension on the biceps.',
        image: '/images/exercises/rope_cable_curl.png',
        tips: [
          'Stand close to the cable and keep elbows fixed.',
          'Spread the rope apart at the top for peak contraction.',
          'Adjust cable height for optimal arm angle.',
          'Use a controlled tempo throughout.'
        ]
      }
    ],
    triceps: [
      {
        id: 'tricep_dip',
        name: 'Tricep Dip',
        description: 'A compound bodyweight movement that builds tricep strength and pressing power.',
        image: '/images/exercises/tricep_dip.png',
        tips: [
          'Keep your torso upright to emphasize triceps.',
          'Lower until elbows reach about 90 degrees.',
          'Avoid flaring elbows too wide.',
          'Use assistance if needed to maintain form.'
        ]
      },
      {
        id: 'overhead_tricep_extension',
        name: 'Overhead Tricep Extension',
        description: 'An overhead extension that stretches and strengthens the long head of the triceps.',
        image: '/images/exercises/overhead_tricep_extension.png',
        tips: [
          'Keep your upper arms close to your head.',
          'Extend fully without locking elbows harshly.',
          'Control the weight on the way down.',
          'Use a weight you can control through full ROM.'
        ]
      },
      {
        id: 'rope_triceps_pushdown',
        name: 'Rope Triceps Pushdown',
        description: 'A cable pushdown that isolates the triceps with constant tension.',
        image: '/images/exercises/rope_triceps_pushdown.png',
        tips: [
          'Keep elbows pinned to your sides.',
          'Spread the rope at the bottom for full contraction.',
          'Avoid leaning too far forward.',
          'Use a slow, controlled eccentric.'
        ]
      }
    ],
    shoulders: [
      {
        id: 'shoulder_press',
        name: 'Shoulder Press',
        description: 'An overhead pressing movement that builds shoulder strength and stability.',
        image: '/images/exercises/shoulder_press.png',
        tips: [
          'Brace your core before each rep.',
          'Press straight up without excessive arching.',
          'Lower the weight to chin or ear level.',
          'Keep wrists stacked over elbows.'
        ]
      },
      {
        id: 'cable_lateral_raise',
        name: 'Cable Lateral Raise',
        description: 'A lateral raise using cables for constant tension on the side delts.',
        image: '/images/exercises/cable_lateral_raise.png',
        tips: [
          'Lead with your elbows, not your hands.',
          'Raise to shoulder height with control.',
          'Avoid shrugging your traps excessively.',
          'Use a light weight for proper form.'
        ]
      },
      {
        id: 'dumbbell_front_raise',
        name: 'Dumbbell Front Raise',
        description: 'An isolation exercise targeting the front deltoids.',
        image: '/images/exercises/dumbbell_front_raise.png',
        tips: [
          'Raise one or both arms to shoulder height.',
          'Keep a slight bend in your elbows.',
          'Avoid swinging the dumbbells.',
          'Control the lowering phase.'
        ]
      }
    ],
    back: [
      {
        id: 'pull_up',
        name: 'Pull-Up',
        description: 'A bodyweight pulling exercise that builds back width and grip strength.',
        image: '/images/exercises/pull_up.png',
        tips: [
          'Start from a dead hang with shoulders engaged.',
          'Pull your chest toward the bar.',
          'Avoid kipping unless intentionally training it.',
          'Lower with full control.'
        ]
      },
      {
        id: 'face_pull',
        name: 'Face Pull',
        description: 'A cable exercise for rear delts and upper back health.',
        image: '/images/exercises/face_pull.png',
        tips: [
          'Set the cable at upper chest height.',
          'Pull toward your face with elbows high.',
          'Squeeze shoulder blades together.',
          'Use a light to moderate weight.'
        ]
      },
      {
        id: 'cable_pulldown',
        name: 'Cable Pulldown',
        description: 'A lat pulldown variation for back width and pulling strength.',
        image: '/images/exercises/cable_pulldown.png',
        tips: [
          'Lean back slightly and pull to upper chest.',
          'Drive elbows down and back.',
          'Avoid pulling with arms only.',
          'Control the weight on the return.'
        ]
      }
    ],
    abs: [
      {
        id: 'crunch',
        name: 'Crunch',
        description: 'A core exercise focusing on abdominal contraction.',
        image: '/images/exercises/crunch.png',
        tips: [
          'Keep lower back pressed to the floor.',
          'Curl your rib cage toward your pelvis.',
          'Exhale as you crunch up.',
          'Avoid pulling on your neck.'
        ]
      },
      {
        id: 'pallof_press',
        name: 'Pallof Press',
        description: 'An anti-rotation core exercise that builds stability.',
        image: '/images/exercises/pallof_press.png',
        tips: [
          'Stand perpendicular to the cable.',
          'Press straight out and resist rotation.',
          'Keep hips and shoulders square.',
          'Hold briefly at full extension.'
        ]
      },
      {
        id: 'dumbbell_russian_twist',
        name: 'Russian Twist',
        description: 'A rotational core exercise targeting the obliques.',
        image: '/images/exercises/dumbbell_russian_twist.png',
        tips: [
          'Lean back slightly with a straight spine.',
          'Rotate from the torso, not just the arms.',
          'Keep feet elevated for more difficulty.',
          'Move with control, not speed.'
        ]
      }
    ],
    legs: [
      {
        id: 'squat',
        name: 'Squat',
        description: 'A fundamental lower-body exercise for quads, glutes, and overall leg strength.',
        image: '/images/exercises/squat.png',
        tips: [
          'Keep chest up and core braced.',
          'Push knees out in line with toes.',
          'Descend until thighs are parallel or below.',
          'Drive through your heels to stand.'
        ]
      }
    ],
    glutes: [
      {
        id: 'glute_bridge',
        name: 'Glute Bridge',
        description: 'A hip thrust variation that activates and strengthens the glutes.',
        image: '/images/exercises/glute_bridge.png',
        tips: [
          'Feet flat, knees bent at about 90 degrees.',
          'Squeeze glutes hard at the top.',
          'Avoid over-arching your lower back.',
          'Lower with control between reps.'
        ]
      }
    ]
  }
};

// In-memory store for custom exercises loaded from localforage
let dynamicExercises = {};

export const initCustomExercises = async () => {
  try {
    const stored = await exerciseStore.getItem('customExercises');
    dynamicExercises = stored || {};
  } catch (err) {
    console.error('Failed to load custom exercises:', err);
    dynamicExercises = {};
  }
};

const saveCustomExercises = async () => {
  try {
    await exerciseStore.setItem('customExercises', dynamicExercises);
  } catch (err) {
    console.error('Failed to save custom exercises:', err);
  }
};

export const addCustomExercise = async (bodyPartId, exerciseData) => {
  const newExercise = {
    ...exerciseData,
    id: `custom_${Date.now()}`,
    isCustom: true
  };
  const existing = dynamicExercises[bodyPartId] || [];
  dynamicExercises[bodyPartId] = [...existing, newExercise];
  await saveCustomExercises();
  return newExercise;
};

export const getExercisesForBodyPart = (bodyPartId) => {
  const base = exerciseData.exercises[bodyPartId] || [];
  const custom = dynamicExercises[bodyPartId] || [];
  return [...base, ...custom];
};

export const deleteCustomExercise = async (bodyPartId, exerciseId) => {
  if (!dynamicExercises[bodyPartId]) return;
  const list = dynamicExercises[bodyPartId];
  const newList = list.filter(e => e.id !== exerciseId);
  if (newList.length) {
    dynamicExercises[bodyPartId] = newList;
  } else {
    delete dynamicExercises[bodyPartId];
  }
  await saveCustomExercises();
};

// In-memory store for custom body parts loaded from localforage
let customBodyParts = [];

export const initCustomBodyParts = async () => {
  try {
    const stored = await exerciseStore.getItem('customBodyParts');
    customBodyParts = Array.isArray(stored) ? stored : [];
  } catch (err) {
    console.error('Failed to load custom body parts:', err);
    customBodyParts = [];
  }
};

const saveCustomBodyParts = async () => {
  try {
    await exerciseStore.setItem('customBodyParts', customBodyParts);
  } catch (err) {
    console.error('Failed to save custom body parts:', err);
  }
};

export const getAllBodyParts = () => {
  return [...exerciseData.bodyParts, ...customBodyParts];
};

export const addCustomBodyPart = async (bodyPartData) => {
  const newBodyPart = {
    id: `custom_body_${Date.now()}`,
    name: bodyPartData.name,
    icon: bodyPartData.icon || '?',
    isCustom: true
  };
  customBodyParts = [...customBodyParts, newBodyPart];
  await saveCustomBodyParts();
  return newBodyPart;
};

export const deleteCustomBodyPart = async (bodyPartId) => {
  customBodyParts = customBodyParts.filter(bp => bp.id !== bodyPartId);
  await saveCustomBodyParts();
  if (dynamicExercises[bodyPartId]) {
    delete dynamicExercises[bodyPartId];
    await saveCustomExercises();
  }
};
