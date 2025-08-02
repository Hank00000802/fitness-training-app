# ���� APP �ק���n

## ? �p��W�[�����ʧ@�M�`�N�ƶ�

### 1. �W�[�s�����鳡��

�b `src/data/exerciseData.js` �ɮפ��A��� `bodyParts` �}�C�G

```javascript
bodyParts: [
  { id: 'chest', name: '��', icon: '?' },
  { id: 'biceps', name: '�G�Y��', icon: '?' },
  // �b�o�̼W�[�s�����鳡��
  { id: 'calves', name: '�p�L', icon: '?' },  // �s�W�p�L
  { id: 'forearms', name: '�e�u', icon: '?' }, // �s�W�e�u
]
```

### 2. �W�[�s���B�ʶ���

�b `exercises` ���󤤼W�[�s���B�ʡG

```javascript
exercises: {
  chest: [
    // �{�����ݳ��B��...
    {
      id: 'incline_bench_press',  // �s���B�� ID
      name: '�W�ױ���',           // �B�ʦW��
      description: '�w��W�ݳ����V�m�ʧ@', // �B�ʴy�z
      image: '/images/exercises/incline_bench_press.png', // �Ϥ����|
      tips: [
        '�վ�������צ�30-45��',
        '�׹a���b�ݫe�A���u�s��',
        '�V�W���|�ɩI��',
        '����U���t��'
      ]
    }
  ],
  // ���s���鳡��W�[�B��
  calves: [
    {
      id: 'standing_calf_raise',
      name: '��������',
      description: '�V�m�p�L�٦ת��򥻰ʧ@',
      image: '/images/exercises/standing_calf_raise.png',
      tips: [
        '���}�P�ӦP�e����',
        '�}�y���b�x����t',
        '�C�C���_�}��',
        '����U���t��'
      ]
    }
  ]
}
```

### 3. �W�[�B�ʹϤ�

1. **�ǳƹϤ��ɮ�**�G
   - �榡�GPNG�]���ˡ^
   - �ؤo�G300x200 �����Χ�j
   - ���e�G�M�����B�ʰʧ@�ܷN��

2. **��J�Ϥ�**�G
   - �N�Ϥ��ɮש�J `public/images/exercises/` ��Ƨ�
   - �ɮצW�٭n�P�{���X�������|�@�P

### 4. �ק�`�N�ƶ�

�b `tips` �}�C���W�[�έק�`�N�ƶ��G

```javascript
tips: [
  '�O�����馨�@���u�A�q�Y��}��',
  '�U���ɯݳ��n�K��a��',
  '�W�ɮɤ��u�n��������',
  '�I�l�n�W�ߡA�U���ɧl��A�W�ɮɩI��',
  '�s�W���`�N�ƶ�...'  // �b�o�̼W�[�s���`�N�ƶ�
]
```

## ? ���p�ק�

### �B�J 1�G���խק�
```bash
npm start
```

### �B�J 2�G����ק�
```bash
git add .
git commit -m "Add new exercises and tips"
git push
```

### �B�J 3�G�۰ʳ��p
- Netlify �|�۰ʭ��s���p
- ���� 1-2 ����
- �ˬd�����O�_��s

## ? �ק�d��

### �W�[�s���ݳ��B�ʡG
```javascript
{
  id: 'decline_pushup',
  name: '�U�ץ�a����',
  description: '�w��U�ݳ�����a��������',
  image: '/images/exercises/decline_pushup.png',
  tips: [
    '���}��b���B�A���⼵�a',
    '����O�����u',
    '�U���ɯݳ��n�K��a��',
    '�o�Ӱʧ@��U�ݳ���E��j'
  ]
}
```

### �W�[�s�����鳡��G
```javascript
{ id: 'core', name: '�֤�', icon: '?' }
```

### ���s���鳡��W�[�B�ʡG
```javascript
core: [
  {
    id: 'plank',
    name: '���O�伵',
    description: '�V�m�֤�í�w���򥻰ʧ@',
    image: '/images/exercises/plank.png',
    tips: [
      '��y���a�A���馨�@���u',
      '����֤ߡA�O���I�l',
      '�קK�v���U�I�Ωﰪ',
      '�i�H�q30��}�l�A�v���W�[�ɶ�'
    ]
  }
]
```

## ?? �`�N�ƶ�

1. **�ɮשR�W**�G�Ϥ��ɮצW�٭n�P�{���X�������|�����@�P
2. **ID �ߤ@��**�G�C�ӹB�ʪ� ID �����O�ߤ@��
3. **�Ϥ��榡**�G��ĳ�ϥ� PNG �榡
4. **����**�G�ק��n���թҦ��\��O�_���`

## ? �ֳt�ק�y�{

1. �s�� `src/data/exerciseData.js`
2. �ǳƨé�J�Ϥ��ɮ�
3. ���� `npm start` ����
4. ����ñ��e�ק�
5. ���� Netlify �۰ʳ��p
6. �ˬd������s

�o�˱z�N�i�H�H�ɼW�[�s�������ʧ@�M�`�N�ƶ��F�I 