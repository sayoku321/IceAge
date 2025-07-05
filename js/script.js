// 氷河期データ
const iceAgeData = [
    { name: '最終氷期', startYear: 110, endYear: 10, temperature: -6, type: 'glacial' },
    { name: '完新世間氷期', startYear: 10, endYear: 0, temperature: 0, type: 'interglacial' },
    { name: 'リス氷期', startYear: 200, endYear: 130, temperature: -5, type: 'glacial' },
    { name: 'リス-ヴュルム間氷期', startYear: 130, endYear: 110, temperature: 1, type: 'interglacial' },
    { name: 'ミンデル氷期', startYear: 350, endYear: 250, temperature: -4, type: 'glacial' },
    { name: 'ミンデル-リス間氷期', startYear: 250, endYear: 200, temperature: 0.5, type: 'interglacial' },
    { name: 'ギュンツ氷期', startYear: 500, endYear: 400, temperature: -4.5, type: 'glacial' },
    { name: 'ギュンツ-ミンデル間氷期', startYear: 400, endYear: 350, temperature: 0, type: 'interglacial' }
];

// 周期データ
const cycleData = [
    { name: '歳差運動', period: 23000, description: '地球の自転軸の向きが変化する周期' },
    { name: '地軸傾斜', period: 41000, description: '地軸の傾きが変化する周期' },
    { name: '離心率', period: 100000, description: '公転軌道の楕円度が変化する周期' }
];

class TemperatureGraph {
    constructor(canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        this.setupCanvas();
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }

    async drawGraph() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 背景グラデーション
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#f0f9ff');
        gradient.addColorStop(1, '#e0f2fe');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // 軸の描画
        this.drawAxes();
        
        // データの描画
        this.drawTemperatureCurve();
        
        // 現在位置マーカー
        this.drawCurrentMarker();
        
        // 凡例
        this.drawLegend();
    }

    drawAxes() {
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        
        this.ctx.strokeStyle = '#374151';
        this.ctx.lineWidth = 2;
        
        // Y軸（気温）
        this.ctx.beginPath();
        this.ctx.moveTo(margin.left, margin.top);
        this.ctx.lineTo(margin.left, this.height - margin.bottom);
        this.ctx.stroke();
        
        // X軸（時間）
        this.ctx.beginPath();
        this.ctx.moveTo(margin.left, this.height - margin.bottom);
        this.ctx.lineTo(this.width - margin.right, this.height - margin.bottom);
        this.ctx.stroke();
        
        // 軸ラベル
        this.ctx.fillStyle = '#374151';
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'center';
        
        // X軸ラベル
        this.ctx.fillText('時間（万年前）', this.width / 2, this.height - 10);
        
        // Y軸ラベル
        this.ctx.save();
        this.ctx.translate(20, this.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('気温変化（℃）', 0, 0);
        this.ctx.restore();
        
        // 目盛り
        this.drawGridLines(margin);
    }

    drawGridLines(margin) {
        this.ctx.strokeStyle = '#d1d5db';
        this.ctx.lineWidth = 1;
        this.ctx.font = '12px sans-serif';
        this.ctx.fillStyle = '#6b7280';
        
        // X軸目盛り（時間）
        for (let i = 0; i <= 500; i += 100) {
            const x = margin.left + (i / 500) * (this.width - margin.left - margin.right);
            this.ctx.beginPath();
            this.ctx.moveTo(x, margin.top);
            this.ctx.lineTo(x, this.height - margin.bottom);
            this.ctx.stroke();
            
            this.ctx.textAlign = 'center';
            this.ctx.fillText(i.toString(), x, this.height - margin.bottom + 20);
        }
        
        // Y軸目盛り（気温）
        for (let i = -8; i <= 2; i += 2) {
            const y = this.height - margin.bottom - ((i + 8) / 10) * (this.height - margin.top - margin.bottom);
            this.ctx.beginPath();
            this.ctx.moveTo(margin.left, y);
            this.ctx.lineTo(this.width - margin.right, y);
            this.ctx.stroke();
            
            this.ctx.textAlign = 'right';
            this.ctx.fillText(i > 0 ? `+${i}` : i.toString(), margin.left - 10, y + 4);
        }
    }

    drawTemperatureCurve() {
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        
        this.ctx.strokeStyle = '#2563eb';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        // データポイントを時系列順にソート
        const sortedData = [...this.data].sort((a, b) => b.startYear - a.startYear);
        
        let isFirst = true;
        for (const period of sortedData) {
            const startX = margin.left + ((500 - period.startYear) / 500) * (this.width - margin.left - margin.right);
            const endX = margin.left + ((500 - period.endYear) / 500) * (this.width - margin.left - margin.right);
            const y = this.height - margin.bottom - ((period.temperature + 8) / 10) * (this.height - margin.top - margin.bottom);
            
            if (isFirst) {
                this.ctx.moveTo(startX, y);
                isFirst = false;
            } else {
                this.ctx.lineTo(startX, y);
            }
            this.ctx.lineTo(endX, y);
            
            // 氷期・間氷期の色分け
            this.ctx.save();
            this.ctx.fillStyle = period.type === 'glacial' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(249, 115, 22, 0.2)';
            this.ctx.fillRect(startX, y, endX - startX, this.height - margin.bottom - y);
            this.ctx.restore();
        }
        
        this.ctx.stroke();
    }

    drawCurrentMarker() {
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        const currentX = margin.left + ((500 - 0) / 500) * (this.width - margin.left - margin.right);
        
        this.ctx.strokeStyle = '#ef4444';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        
        this.ctx.beginPath();
        this.ctx.moveTo(currentX, margin.top);
        this.ctx.lineTo(currentX, this.height - margin.bottom);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
        
        // 現在マーカーラベル
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = 'bold 12px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('現在', currentX, margin.top - 10);
    }

    drawLegend() {
        const legendX = this.width - 150;
        const legendY = 60;
        
        // 氷期
        this.ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
        this.ctx.fillRect(legendX, legendY, 20, 15);
        this.ctx.fillStyle = '#374151';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('氷期', legendX + 25, legendY + 12);
        
        // 間氷期
        this.ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
        this.ctx.fillRect(legendX, legendY + 25, 20, 15);
        this.ctx.fillStyle = '#374151';
        this.ctx.fillText('間氷期', legendX + 25, legendY + 37);
    }
}

class Timeline {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
    }

    async renderTimeline() {
        const sortedData = [...this.data].sort((a, b) => b.startYear - a.startYear);
        
        this.container.innerHTML = '';
        
        sortedData.forEach((period, index) => {
            const item = document.createElement('div');
            item.className = `timeline-item ${period.type} ${period.endYear === 0 ? 'current' : ''}`;
            
            item.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-lg">${period.name}</h4>
                        <p class="text-sm text-gray-600">
                            ${period.startYear}万年前 - ${period.endYear === 0 ? '現在' : period.endYear + '万年前'}
                        </p>
                    </div>
                    <div class="text-right">
                        <span class="text-2xl font-bold ${period.temperature > 0 ? 'text-orange-600' : 'text-blue-600'}">
                            ${period.temperature > 0 ? '+' : ''}${period.temperature}℃
                        </span>
                        <p class="text-sm text-gray-500">${period.type === 'glacial' ? '氷期' : '間氷期'}</p>
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => this.showPeriodDetails(period));
            this.container.appendChild(item);
        });
    }

    showPeriodDetails(period) {
        const details = {
            glacial: {
                features: ['大陸氷床の拡大', '海水面の低下（約120m）', '陸橋の形成', '寒冷・乾燥気候'],
                co2: '約180ppm',
                duration: '約9万年'
            },
            interglacial: {
                features: ['氷床の縮小', '海水面の上昇', '温暖・湿潤気候', '森林の拡大'],
                co2: '約280ppm',
                duration: '約1万年'
            }
        };
        
        const detail = details[period.type];
        alert(`${period.name}の詳細:\n\n特徴:\n${detail.features.join('\n')}\n\nCO2濃度: ${detail.co2}\n典型的期間: ${detail.duration}`);
    }
}

class ComparisonChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    async drawComparison() {
        const comparisonData = [
            { label: '平均気温', glacial: -6, interglacial: 0, unit: '℃' },
            { label: '海水面', glacial: -120, interglacial: 0, unit: 'm' },
            { label: 'CO2濃度', glacial: 180, interglacial: 280, unit: 'ppm' },
            { label: '期間', glacial: 90, interglacial: 10, unit: '千年' }
        ];
        
        this.container.innerHTML = '<h3 class="text-xl font-bold mb-4 text-center">氷期 vs 間氷期 比較チャート</h3>';
        
        comparisonData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'mb-6';
            
            const maxValue = Math.max(Math.abs(item.glacial), Math.abs(item.interglacial));
            const glacialWidth = Math.abs(item.glacial) / maxValue * 100;
            const interglacialWidth = Math.abs(item.interglacial) / maxValue * 100;
            
            row.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">${item.label}</span>
                    <span class="text-sm text-gray-500">${item.unit}</span>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-blue-700 mb-1">氷期: ${item.glacial}${item.unit}</div>
                        <div class="comparison-bar">
                            <div class="comparison-bar-fill glacial-bar" style="width: ${glacialWidth}%">
                                ${Math.abs(item.glacial)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-orange-700 mb-1">間氷期: ${item.interglacial}${item.unit}</div>
                        <div class="comparison-bar">
                            <div class="comparison-bar-fill interglacial-bar" style="width: ${interglacialWidth}%">
                                ${Math.abs(item.interglacial)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            this.container.appendChild(row);
        });
    }
}

class IceAgeApp {
    constructor() {
        this.temperatureGraph = null;
        this.timeline = null;
        this.comparisonChart = null;
    }

    async init() {
        try {
            // グラフの初期化
            this.temperatureGraph = new TemperatureGraph('temp-canvas', iceAgeData);
            await this.temperatureGraph.drawGraph();
            
            // タイムラインの初期化
            this.timeline = new Timeline('timeline-container', iceAgeData);
            await this.timeline.renderTimeline();
            
            // 比較チャートの初期化
            this.comparisonChart = new ComparisonChart('comparison-chart');
            await this.comparisonChart.drawComparison();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            // アニメーション効果の追加
            this.addAnimations();
            
        } catch (error) {
            console.error('初期化エラー:', error);
        }
    }

    setupEventListeners() {
        // スムーズスクロールナビゲーション
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ウィンドウリサイズ時のグラフ再描画
        window.addEventListener('resize', () => {
            if (this.temperatureGraph) {
                this.temperatureGraph.setupCanvas();
                this.temperatureGraph.drawGraph();
            }
        });

        // スクロール時のナビゲーションハイライト
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    addAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', async () => {
    const app = new IceAgeApp();
    await app.init();
});