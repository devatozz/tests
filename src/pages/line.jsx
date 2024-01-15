"use client"
import Script from "next/script";
import { useEffect } from "react"
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, LineController, PointElement } from 'chart.js';
// import Chart from 'chart.js/auto';

Chart.register(
    CategoryScale, LinearScale, BarElement, LineElement, LineController,
    PointElement);

export default function line() {
    const data = [];
    const data2 = [];
    let prev = 100;
    let prev2 = 80;
    for (let i = 0; i < 24; i++) {
        prev += 5 - Math.random() * 10;
        data.push({ x: i, y: prev });
        prev2 += 5 - Math.random() * 10;
        data2.push({ x: i, y: prev2 });
    }
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };


    let chartRef = null;
    const onLoadChart = () => {
        const ctx = document.getElementById('btc-chart');
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: "red",
                    borderWidth: 1,
                    radius: 0,
                    data: data,
                },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    },
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        };
        if (chartRef) chartRef.destroy();;
        chartRef = new Chart(ctx, config);
    }
    useEffect(() => {
        onLoadChart()
    })

    return <>
        <div style={{ width: "100px", height: "80px", position: "relative" }}>
            <canvas id="btc-chart"></canvas>
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1, width: "100%", height: "100%" }}>
            </div>
        </div>

    </>
}