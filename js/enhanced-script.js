// 氷河期の包括的可視化システム
// Enhanced Ice Age Visualization System

// データのインポート
import { majorIceAges, quaternaryPeriods, milankovitchCycles, periodCharacteristics, currentStatus } from '../data/ice-age-data.js';

class ComprehensiveIceAgeVisualization {
    constructor() {
        this.charts = {};
        this.colors = {
            glacial: '#2563eb',
            interglacial: '#f97316',
            major: '#7c3aed',
            current: '#ef4444',
            background: '#f8fafc'
        };
    }

    async init() {
        try {
            // 各グラフの初期化
            await this.initMajorIceAgesTimeline();
            await this.initQuaternaryTemperatureGraph();
            await this.initMilankovitchCyclesGraph();
            await this.initComprehensiveOverviewGraph();
            await this.initComparisonCharts();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            console.log('氷河期可視化システムが正常に初期化されました');
        } catch (error) {
            console.error('初期化エラー:', error);
        }
    }

    // 大氷河期タイムライン
    async initMajorIceAgesTimeline() {
        const canvas = document.getElementById('major-ice-ages-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.setupCanvas(canvas, ctx);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        const margin = { top: 40, right: 40, bottom: 80, left: 100 };

        // 背景
        ctx.fillStyle = this.colors.background;
        ctx.fillRect(0, 0, width, height);

        // タイムライン軸
        this.drawTimelineAxis(ctx, width, height, margin, 'major');

        // 大氷河期の描画
        majorIceAges.forEach((iceAge, index) => {
            const startX = this.timeToX(iceAge.startYear, width, margin, 'major');
            const endX = this.timeToX(iceAge.endYear, width, margin, 'major');
            const y = margin.top + index * 60;

            // 氷河期バー
            ctx.fillStyle = this.colors.major;
            ctx.fillRect(startX, y, endX - startX, 40);

            // ラベル
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(iceAge.name, margin.left - 90, y + 25);

            // 期間表示
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#6b7280';
            const duration = (iceAge.duration / 1000000).toFixed(0);
            ctx.fillText(`${duration}百万年間`, startX, y - 5);
        });

        // 現在位置マーカー
        const currentX = this.timeToX(0, width, margin, 'major');
        ctx.strokeStyle = this.colors.current;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(currentX, margin.top);
        ctx.lineTo(currentX, height - margin.bottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // 現在マーカーラベル
        ctx.fillStyle = this.colors.current;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('現在', currentX, margin.top - 10);
    }

    // 第四紀気温変化グラフ
    async initQuaternaryTemperatureGraph() {
        const canvas = document.getElementById('quaternary-temp-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.setupCanvas(canvas, ctx);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };

        // 背景グラデーション
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#f0f9ff');
        gradient.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 軸の描画
        this.drawAxes(ctx, width, height, margin, 'quaternary');

        // 温度曲線の描画
        this.drawTemperatureCurve(ctx, width, height, margin, quaternaryPeriods);

        // 氷期・間氷期の色分け背景
        this.drawPeriodBackgrounds(ctx, width, height, margin, quaternaryPeriods);

        // 現在位置マーカー
        this.drawCurrentMarker(ctx, width, height, margin, 'quaternary');

        // 凡例
        this.drawLegend(ctx, width, height);
    }

    // ミランコビッチサイクルグラフ
    async initMilankovitchCyclesGraph() {
        const canvas = document.getElementById('milankovitch-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.setupCanvas(canvas, ctx);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };

        // 背景
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, width, height);

        // 各サイクルの描画
        const cycleHeight = (height - margin.top - margin.bottom) / 3;
        
        milankovitchCycles.forEach((cycle, index) => {
            const y = margin.top + index * cycleHeight;
            this.drawSinusoidalCycle(ctx, width, margin, y, cycleHeight, cycle);
        });

        // 軸ラベル
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('時間（年）', width / 2, height - 10);
    }

    // 包括的概要グラフ
    async initComprehensiveOverviewGraph() {
        const canvas = document.getElementById('comprehensive-canvas');
        if (!canvas) {
            console.error('Canvas element "comprehensive-canvas" not found.');
            return;
        }

        const ctx = canvas.getContext('2d');
        this.setupCanvas(canvas, ctx);

        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        const margin = { top: 60, right: 40, bottom: 80, left: 80 };

        // 背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // タイトル
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('氷河期の包括的タイムライン', width / 2, 30);

        // 大氷河期（上部）
        const majorHeight = (height - margin.top - margin.bottom) * 0.3;
        this.drawMajorIceAgesSection(ctx, width, margin, majorHeight);

        // 第四紀詳細（下部）
        const quaternaryY = margin.top + majorHeight + 40;
        const quaternaryHeight = (height - margin.top - margin.bottom) * 0.6;
        this.drawQuaternarySection(ctx, width, quaternaryY, quaternaryHeight);
    }

    // 比較チャート
    async initComparisonCharts() {
        const container = document.getElementById('enhanced-comparison-chart');
        if (!container) return;

        container.innerHTML = '';

        // 氷期 vs 間氷期の比較
        const comparisonData = [
            { label: '平均気温変化', glacial: -6, interglacial: 0, unit: '℃', max: 8 },
            { label: '海水面変化', glacial: -120, interglacial: 0, unit: 'm', max: 150 },
            { label: 'CO2濃度', glacial: 180, interglacial: 280, unit: 'ppm', max: 300 },
            { label: '典型的期間', glacial: 90, interglacial: 10, unit: '千年', max: 100 }
        ];

        const chartContainer = document.createElement('div');
        chartContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8';

        comparisonData.forEach(item => {
            const chartDiv = this.createComparisonChart(item);
            chartContainer.appendChild(chartDiv);
        });

        container.appendChild(chartContainer);

        // 現在の状況チャート
        const currentChart = this.createCurrentStatusChart();
        container.appendChild(currentChart);
    }

    // ヘルパーメソッド
    setupCanvas(canvas, ctx) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    timeToX(time, width, margin, scale) {
        if (scale === 'major') {
            // 対数スケール（大氷河期用）
            const maxTime = 2500000000; // 25億年
            const minTime = 1;
            const logTime = Math.log10(time + 1);
            const logMax = Math.log10(maxTime);
            return margin.left + (1 - logTime / logMax) * (width - margin.left - margin.right);
        } else {
            // 線形スケール（第四紀用）
            const maxTime = 800000; // 80万年
            return margin.left + (1 - time / maxTime) * (width - margin.left - margin.right);
        }
    }

    drawTimelineAxis(ctx, width, height, margin, scale) {
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;

        // X軸
        ctx.beginPath();
        ctx.moveTo(margin.left, height - margin.bottom);
        ctx.lineTo(width - margin.right, height - margin.bottom);
        ctx.stroke();

        // 目盛りとラベル
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';

        if (scale === 'major') {
            const timePoints = [2000000000, 1000000000, 500000000, 100000000, 10000000, 1000000, 0];
            timePoints.forEach(time => {
                const x = this.timeToX(time, width, margin, scale);
                ctx.beginPath();
                ctx.moveTo(x, height - margin.bottom);
                ctx.lineTo(x, height - margin.bottom + 10);
                ctx.stroke();

                const label = time === 0 ? '現在' : `${(time / 1000000).toFixed(0)}Ma`;
                ctx.fillText(label, x, height - margin.bottom + 25);
            });
        }

        // 軸ラベル
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.fillText('時間（年前）', width / 2, height - 10);
    }

    drawAxes(ctx, width, height, margin, scale) {
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;

        // Y軸（気温）
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, height - margin.bottom);
        ctx.stroke();

        // X軸（時間）
        ctx.beginPath();
        ctx.moveTo(margin.left, height - margin.bottom);
        ctx.lineTo(width - margin.right, height - margin.bottom);
        ctx.stroke();

        // グリッドライン
        this.drawGridLines(ctx, width, height, margin, scale);
    }

    drawGridLines(ctx, width, height, margin, scale) {
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#6b7280';

        // Y軸目盛り（気温）
        for (let i = -8; i <= 4; i += 2) {
            const y = height - margin.bottom - ((i + 8) / 12) * (height - margin.top - margin.bottom);
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(width - margin.right, y);
            ctx.stroke();

            ctx.textAlign = 'right';
            ctx.fillText(i > 0 ? `+${i}` : i.toString(), margin.left - 10, y + 4);
        }

        // X軸目盛り（時間）
        if (scale === 'quaternary') {
            for (let i = 0; i <= 800; i += 100) {
                const x = margin.left + (i / 800) * (width - margin.left - margin.right);
                ctx.beginPath();
                ctx.moveTo(x, margin.top);
                ctx.lineTo(x, height - margin.bottom);
                ctx.stroke();

                ctx.textAlign = 'center';
                ctx.fillText(`${800 - i}`, x, height - margin.bottom + 20);
            }
        }

        // 軸ラベル
        ctx.fillStyle = '#374151';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('時間（千年前）', width / 2, height - 10);

        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('気温変化（℃）', 0, 0);
        ctx.restore();
    }

    drawTemperatureCurve(ctx, width, height, margin, data) {
        const sortedData = [...data].sort((a, b) => b.startYear - a.startYear);

        ctx.strokeStyle = this.colors.glacial;
        ctx.lineWidth = 3;
        ctx.beginPath();

        let isFirst = true;
        for (const period of sortedData) {
            const startX = this.timeToX(period.startYear, width, margin, 'quaternary');
            const endX = this.timeToX(period.endYear, width, margin, 'quaternary');
            const y = height - margin.bottom - ((period.temperature + 8) / 12) * (height - margin.top - margin.bottom);

            if (isFirst) {
                ctx.moveTo(startX, y);
                isFirst = false;
            } else {
                ctx.lineTo(startX, y);
            }
            ctx.lineTo(endX, y);
        }

        ctx.stroke();
    }

    drawPeriodBackgrounds(ctx, width, height, margin, data) {
        data.forEach(period => {
            const startX = this.timeToX(period.startYear, width, margin, 'quaternary');
            const endX = this.timeToX(period.endYear, width, margin, 'quaternary');
            const y = height - margin.bottom - ((period.temperature + 8) / 12) * (height - margin.top - margin.bottom);

            ctx.fillStyle = period.type === 'glacial' ? 
                'rgba(37, 99, 235, 0.1)' : 'rgba(249, 115, 22, 0.1)';
            ctx.fillRect(startX, y, endX - startX, height - margin.bottom - y);
        });
    }

    drawCurrentMarker(ctx, width, height, margin, scale) {
        const currentX = this.timeToX(0, width, margin, scale);

        ctx.strokeStyle = this.colors.current;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(currentX, margin.top);
        ctx.lineTo(currentX, height - margin.bottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // 現在マーカーラベル
        ctx.fillStyle = this.colors.current;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('現在', currentX, margin.top - 10);
    }

    drawLegend(ctx, width, height) {
        const legendX = width - 150;
        const legendY = 60;

        // 氷期
        ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.fillRect(legendX, legendY, 20, 15);
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('氷期', legendX + 25, legendY + 12);

        // 間氷期
        ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
        ctx.fillRect(legendX, legendY + 25, 20, 15);
        ctx.fillStyle = '#374151';
        ctx.fillText('間氷期', legendX + 25, legendY + 37);
    }

    drawSinusoidalCycle(ctx, width, margin, y, height, cycle) {
        const centerY = y + height / 2;
        const amplitude = (height / 2 - 20) * cycle.amplitude / 2;

        ctx.strokeStyle = this.colors.major;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = margin.left; x < width - margin.right; x += 2) {
            const time = ((x - margin.left) / (width - margin.left - margin.right)) * 500000; // 50万年
            const angle = (time / cycle.period) * 2 * Math.PI;
            const waveY = centerY + amplitude * Math.sin(angle);

            if (x === margin.left) {
                ctx.moveTo(x, waveY);
            } else {
                ctx.lineTo(x, waveY);
            }
        }

        ctx.stroke();

        // サイクル名
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(cycle.name, 10, centerY);

        // 周期表示
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText(`${(cycle.period / 1000).toFixed(0)}千年周期`, 10, centerY + 20);
    }

    // 包括的概要グラフの大氷河期セクション描画
    drawMajorIceAgesSection(ctx, width, margin, sectionHeight) {
        const startY = margin.top;
        const sectionWidth = width - margin.left - margin.right;

        // 背景
        ctx.fillStyle = '#f0f4f8';
        ctx.fillRect(margin.left, startY, sectionWidth, sectionHeight);

        // 軸
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin.left, startY + sectionHeight);
        ctx.lineTo(width - margin.right, startY + sectionHeight);
        ctx.stroke();

        // 目盛りとラベル
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';

        const timePoints = [2000000000, 1000000000, 500000000, 100000000, 10000000, 1000000, 0];
        timePoints.forEach(time => {
            const x = this.timeToX(time, width, margin, 'major');
            ctx.beginPath();
            ctx.moveTo(x, startY + sectionHeight);
            ctx.lineTo(x, startY + sectionHeight + 5);
            ctx.stroke();
            const label = time === 0 ? '現在' : `${(time / 1000000).toFixed(0)}Ma`;
            ctx.fillText(label, x, startY + sectionHeight + 15);
        });

        // 大氷河期の描画
        majorIceAges.forEach((iceAge) => {
            const startX = this.timeToX(iceAge.startYear, width, margin, 'major');
            const endX = this.timeToX(iceAge.endYear, width, margin, 'major');
            ctx.fillStyle = this.colors.major;
            ctx.fillRect(startX, startY + sectionHeight * 0.3, endX - startX, sectionHeight * 0.4);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            if (endX - startX > 30) { // 十分な幅がある場合のみラベルを表示
                ctx.fillText(iceAge.name, startX + (endX - startX) / 2, startY + sectionHeight * 0.55);
            }
        });

        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('大氷河期', margin.left - 70, startY + sectionHeight * 0.5);
    }

    // 包括的概要グラフの第四紀セクション描画
    drawQuaternarySection(ctx, width, startY, sectionHeight) {
        const margin = { left: 80, right: 40 }; // Use local margin for this section
        const sectionWidth = width - margin.left - margin.right;

        // 背景
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(margin.left, startY, sectionWidth, sectionHeight);

        // 軸
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin.left, startY + sectionHeight);
        ctx.lineTo(width - margin.right, startY + sectionHeight);
        ctx.stroke();

        // 目盛りとラベル
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';

        for (let i = 0; i <= 800; i += 100) {
            const x = margin.left + (i / 800) * sectionWidth;
            ctx.beginPath();
            ctx.moveTo(x, startY + sectionHeight);
            ctx.lineTo(x, startY + sectionHeight + 5);
            ctx.stroke();
            ctx.fillText(`${800 - i}k`, x, startY + sectionHeight + 15);
        }

        // 気温曲線
        const tempScale = (val) => startY + sectionHeight - ((val + 8) / 12) * sectionHeight; // Adjust to fit sectionHeight
        
        ctx.strokeStyle = this.colors.glacial;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const sortedQuaternary = [...quaternaryPeriods].sort((a, b) => b.startYear - a.startYear);

        let isFirst = true;
        for (const period of sortedQuaternary) {
            const startX = this.timeToX(period.startYear, width, margin, 'quaternary');
            const endX = this.timeToX(period.endYear, width, margin, 'quaternary');
            const y = tempScale(period.temperature);

            if (isFirst) {
                ctx.moveTo(startX, y);
                isFirst = false;
            } else {
                ctx.lineTo(startX, y);
            }
            ctx.lineTo(endX, y);
        }
        ctx.stroke();

        // 氷期・間氷期の色分け背景
        sortedQuaternary.forEach(period => {
            const startX = this.timeToX(period.startYear, width, margin, 'quaternary');
            const endX = this.timeToX(period.endYear, width, margin, 'quaternary');
            const y = tempScale(period.temperature);

            ctx.fillStyle = period.type === 'glacial' ? 
                'rgba(37, 99, 235, 0.1)' : 'rgba(249, 115, 22, 0.1)';
            ctx.fillRect(startX, y, endX - startX, startY + sectionHeight - y);
        });

        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('第四紀サイクル', margin.left - 70, startY + sectionHeight * 0.5);

        // 現在位置マーカー
        const currentX = this.timeToX(0, width, margin, 'quaternary');
        ctx.strokeStyle = this.colors.current;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(currentX, startY);
        ctx.lineTo(currentX, startY + sectionHeight);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = this.colors.current;
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('現在', currentX, startY - 5);
    }


    createComparisonChart(data) {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg shadow-md';

        const maxValue = Math.max(Math.abs(data.glacial), Math.abs(data.interglacial), data.max || 100);
        const glacialWidth = Math.abs(data.glacial) / maxValue * 100;
        const interglacialWidth = Math.abs(data.interglacial) / maxValue * 100;

        div.innerHTML = `
            <h4 class="font-bold text-lg mb-4 text-center">${data.label}</h4>
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-blue-700">氷期</span>
                        <span class="text-sm text-gray-600">${data.glacial}${data.unit}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                        <div class="bg-blue-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" 
                            style="width: ${glacialWidth}%">
                            ${Math.abs(data.glacial)}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-orange-700">間氷期</span>
                        <span class="text-sm text-gray-600">${data.interglacial}${data.unit}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                        <div class="bg-orange-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" 
                            style="width: ${interglacialWidth}%">
                            ${Math.abs(data.interglacial)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return div;
    }

    createCurrentStatusChart() {
        const div = document.createElement('div');
        div.className = 'bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg shadow-md mt-8';

        div.innerHTML = `
            <h3 class="text-xl font-bold mb-6 text-center text-gray-800">現在の地球の状況</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">${currentStatus.currentCO2}</div>
                    <div class="text-sm text-gray-600">現在のCO2濃度 (ppm)</div>
                    <div class="text-xs text-red-500 mt-1">氷期の${(currentStatus.currentCO2/180).toFixed(1)}倍</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">+${currentStatus.temperatureAnomaly}</div>
                    <div class="text-sm text-gray-600">産業革命前比気温上昇 (℃)</div>
                    <div class="text-xs text-red-500 mt-1">自然変化の${currentStatus.anthropogenicFactors.temperatureRate}倍の速度</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">${(currentStatus.projectedDuration/1000).toFixed(0)}</div>
                    <div class="text-sm text-gray-600">間氷期予想継続期間 (千年)</div>
                    <div class="text-xs text-gray-500 mt-1">人為的影響により不確実</div>
                </div>
            </div>
        `;

        return div;
    }

    setupEventListeners() {
        // ウィンドウリサイズ時の再描画
        window.addEventListener('resize', () => {
            setTimeout(() => this.init(), 100);
        });

        // インタラクティブ要素の設定
        this.setupInteractiveElements();
    }

    setupInteractiveElements() {
        // 期間詳細表示
        document.querySelectorAll('.period-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const periodName = e.target.dataset.period;
                this.showPeriodDetails(periodName);
            });
        });
    }

    async showPeriodDetails(periodName) {
        const period = quaternaryPeriods.find(p => p.name === periodName);
        if (!period) return;

        const characteristics = periodCharacteristics[period.type];
        const modal = document.getElementById('myModal');
        const modalText = document.getElementById('modal-text');
        const aiResponseContainer = document.getElementById('ai-response-container');
        const aiResponseElement = document.getElementById('ai-response');
        const expandButton = document.getElementById('expand-fact-button');
        const loader = document.getElementById('ai-loader');

        // 初期表示内容
        modalText.textContent = `
${period.name}の詳細情報

期間: ${period.startYear.toLocaleString()}年前 - ${period.endYear === 0 ? '現在' : period.endYear.toLocaleString() + '年前'}
気温変化: ${period.temperature > 0 ? '+' : ''}${period.temperature}℃
CO2濃度: ${period.co2}ppm
タイプ: ${period.type === 'glacial' ? '氷期' : '間氷期'}

特徴:
${characteristics.features.join('\n')}
        `;
        aiResponseElement.textContent = ''; // Clear previous AI response
        aiResponseContainer.style.display = 'block'; // Ensure container is visible
        loader.style.display = 'none'; // Hide loader initially
        expandButton.style.display = 'block'; // Show the expand button

        modal.style.display = 'flex'; // Flexboxを使って中央揃え

        const closeButton = document.querySelector('.close-button');
        closeButton.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Gemini API呼び出し機能
        expandButton.onclick = async () => {
            loader.style.display = 'block'; // Show loader
            aiResponseElement.textContent = ''; // Clear previous AI response
            expandButton.disabled = true; // Disable button during loading

            const prompt = `
                以下の氷河期または間氷期について、詳細かつ興味深い事実を日本語で提供してください。
                期間名: ${period.name} (${period.nameEn})
                期間: ${period.startYear.toLocaleString()}年前 - ${period.endYear === 0 ? '現在' : period.endYear.toLocaleString() + '年前'}
                タイプ: ${period.type === 'glacial' ? '氷期' : '間氷期'}
                気温変化: ${period.temperature > 0 ? '+' : ''}${period.temperature}℃
                CO2濃度: ${period.co2}ppm
                主な特徴: ${characteristics.features.join('、')}

                この期間が地球の歴史においてなぜ重要なのか、その期間中にどのような主要な出来事や変化があったのか、
                そしてその期間が現在の気候や生態系にどのような影響を与えているかについて、
                専門家が一般の読者向けに説明するような形で、簡潔かつ魅力的に解説してください。
                また、その期間に特有の面白いエピソードや、あまり知られていない事実があれば含めてください。
                出力はMarkdown形式でお願いします。
            `;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    aiResponseElement.textContent = text;
                } else {
                    aiResponseElement.textContent = '追加情報を生成できませんでした。';
                    console.error('Gemini APIからの応答構造が予期せぬものでした:', result);
                }
            } catch (error) {
                aiResponseElement.textContent = '情報の生成中にエラーが発生しました。';
                console.error('Gemini API呼び出しエラー:', error);
            } finally {
                loader.style.display = 'none'; // Hide loader
                expandButton.disabled = false; // Re-enable button
            }
        };
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', async () => {
    const visualization = new ComprehensiveIceAgeVisualization();
    await visualization.init();

    // セクションのフェードインアニメーション
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    console.log('氷河期ウェブサイトが正常に読み込まれました');
});
