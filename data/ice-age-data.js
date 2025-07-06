// 氷河期の包括的データ
// Comprehensive Ice Age Data

// 大氷河期データ (Major Ice Ages)
export const majorIceAges = [
    {
        name: 'ヒューロニアン氷河期',
        nameEn: 'Huronian Ice Age',
        startYear: 2400000000, // 24億年前
        endYear: 2100000000,   // 21億年前
        duration: 300000000,   // 3億年間
        description: '地球史上最初の大氷河期。酸素の増加により引き起こされた。',
        type: 'major'
    },
    {
        name: 'クライオジェニアン氷河期',
        nameEn: 'Cryogenian Ice Age',
        startYear: 850000000,  // 8.5億年前
        endYear: 635000000,    // 6.35億年前
        duration: 215000000,   // 2.15億年間
        description: '「スノーボールアース」として知られる極端な氷河期。',
        type: 'major'
    },
    {
        name: 'アンデス・サハラ氷河期',
        nameEn: 'Andean-Saharan Ice Age',
        startYear: 460000000,  // 4.6億年前
        endYear: 430000000,    // 4.3億年前
        duration: 30000000,    // 3000万年間
        description: 'オルドビス紀末の大量絶滅と関連する氷河期。',
        type: 'major'
    },
    {
        name: '後期古生代氷河期',
        nameEn: 'Late Paleozoic Ice Age',
        startYear: 360000000,  // 3.6億年前
        endYear: 260000000,    // 2.6億年前
        duration: 100000000,   // 1億年間
        description: 'ゴンドワナ大陸の南極への移動により引き起こされた。',
        type: 'major'
    },
    {
        name: '第四紀氷河期',
        nameEn: 'Quaternary Ice Age',
        startYear: 2580000,    // 258万年前
        endYear: 0,            // 現在まで継続
        duration: 2580000,     // 258万年間（継続中）
        description: '現在も継続中の氷河期。氷期・間氷期サイクルが特徴。',
        type: 'major'
    }
];

// 第四紀氷河期内の氷期・間氷期サイクル（過去80万年間）
export const quaternaryPeriods = [
    // 間氷期
    { name: '完新世間氷期', startYear: 11700, endYear: 0, temperature: 0, type: 'interglacial', co2: 280, nameEn: 'Holocene Interglacial' },
    { name: 'エーミアン間氷期', startYear: 130000, endYear: 115000, temperature: 2, type: 'interglacial', co2: 280, nameEn: 'Eemian Interglacial' },
    { name: 'MIS 7間氷期', startYear: 245000, endYear: 190000, temperature: -1, type: 'interglacial', co2: 260, nameEn: 'MIS 7 Interglacial' },
    { name: 'MIS 9間氷期', startYear: 337000, endYear: 300000, temperature: 0, type: 'interglacial', co2: 270, nameEn: 'MIS 9 Interglacial' },
    { name: 'MIS 11間氷期', startYear: 424000, endYear: 374000, temperature: 1, type: 'interglacial', co2: 275, nameEn: 'MIS 11 Interglacial' },
    { name: 'MIS 13間氷期', startYear: 533000, endYear: 478000, temperature: -1, type: 'interglacial', co2: 250, nameEn: 'MIS 13 Interglacial' },
    { name: 'MIS 15間氷期', startYear: 621000, endYear: 563000, temperature: -2, type: 'interglacial', co2: 240, nameEn: 'MIS 15 Interglacial' },
    { name: 'MIS 17間氷期', startYear: 712000, endYear: 676000, temperature: -1, type: 'interglacial', co2: 245, nameEn: 'MIS 17 Interglacial' },
    { name: 'MIS 19間氷期', startYear: 787000, endYear: 761000, temperature: -2, type: 'interglacial', co2: 235, nameEn: 'MIS 19 Interglacial' },
    
    // 氷期
    { name: '最終氷期', startYear: 115000, endYear: 11700, temperature: -6, type: 'glacial', co2: 180, nameEn: 'Last Glacial Period' },
    { name: 'MIS 6氷期', startYear: 190000, endYear: 130000, temperature: -5, type: 'glacial', co2: 180, nameEn: 'MIS 6 Glacial Period' },
    { name: 'MIS 8氷期', startYear: 300000, endYear: 245000, temperature: -4, type: 'glacial', co2: 190, nameEn: 'MIS 8 Glacial Period' },
    { name: 'MIS 10氷期', startYear: 374000, endYear: 337000, temperature: -5, type: 'glacial', co2: 185, nameEn: 'MIS 10 Glacial Period' },
    { name: 'MIS 12氷期', startYear: 478000, endYear: 424000, temperature: -6, type: 'glacial', co2: 175, nameEn: 'MIS 12 Glacial Period' },
    { name: 'MIS 14氷期', startYear: 563000, endYear: 533000, temperature: -4, type: 'glacial', co2: 190, nameEn: 'MIS 14 Glacial Period' },
    { name: 'MIS 16氷期', startYear: 676000, endYear: 621000, temperature: -5, type: 'glacial', co2: 180, nameEn: 'MIS 16 Glacial Period' },
    { name: 'MIS 18氷期', startYear: 761000, endYear: 712000, temperature: -4, type: 'glacial', co2: 185, nameEn: 'MIS 18 Glacial Period' },
    { name: 'MIS 20氷期', startYear: 814000, endYear: 787000, temperature: -3, type: 'glacial', co2: 195, nameEn: 'MIS 20 Glacial Period' }
];

// ミランコビッチサイクルデータ
export const milankovitchCycles = [
    {
        name: '歳差運動',
        nameEn: 'Precession',
        period: 23000,
        description: '地球の自転軸の向きが変化する周期',
        effect: '季節のタイミングに影響',
        amplitude: 0.5
    },
    {
        name: '地軸傾斜',
        nameEn: 'Obliquity',
        period: 41000,
        description: '地軸の傾きが21.5°〜24.5°の間で変化する周期',
        effect: '季節性の強さに影響',
        amplitude: 1.0
    },
    {
        name: '離心率',
        nameEn: 'Eccentricity',
        period: 100000,
        description: '公転軌道の楕円度が変化する周期',
        effect: '年間日射量の変化に影響',
        amplitude: 2.0
    }
];

// 氷期・間氷期の特徴比較データ
export const periodCharacteristics = {
    glacial: {
        temperature: -6,
        seaLevel: -120,
        co2: 180,
        duration: 90000,
        iceVolume: 150,
        features: [
            '大陸氷床の拡大',
            '海水面の低下（約120m）',
            '陸橋の形成',
            '寒冷・乾燥気候',
            'CO2濃度の低下',
            '森林の縮小',
            '砂漠の拡大'
        ]
    },
    interglacial: {
        temperature: 0,
        seaLevel: 0,
        co2: 280,
        duration: 10000,
        iceVolume: 50,
        features: [
            '氷床の縮小・後退',
            '海水面の上昇',
            '温暖・湿潤気候',
            '森林の拡大',
            'CO2濃度の上昇',
            '生物多様性の増加',
            '海峡・水道の形成'
        ]
    }
};

// 現在の状況データ
export const currentStatus = {
    period: 'interglacial',
    name: '完新世',
    startYear: 11700,
    currentCO2: 420, // 2024年現在
    temperatureAnomaly: 1.1, // 産業革命前比
    projectedDuration: 50000,
    anthropogenicFactors: {
        co2Increase: 50, // %
        temperatureRate: 10, // 自然変化の10倍
        timeScale: 200 // 200年で大きな変化
    }
};
