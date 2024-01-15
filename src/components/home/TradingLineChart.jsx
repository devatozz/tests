
"use client"
import { useEffect } from "react"
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, LineController, PointElement } from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    LineController,
    PointElement);

export default function TradingLineChart(props) {
    const data = [];
    let prev = 100;
    for (let i = 0; i < 24; i++) {
        prev += 5 - Math.random() * 10;
        data.push({ x: i, y: prev });
        prev2 += 5 - Math.random() * 10;
    }


    const [chartUrl, setChartUrl] = useState("");
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
        setChartUrl(chartRef.toBase64Image())
    }
    useEffect(() => {
        onLoadChart()
    })

    return <>
        {chartUrl}-
        <div style={{ width: "100px", height: "80px", position: "relative" }}>
            <canvas id="btc-chart"></canvas>
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1, width: "100%", height: "100%" }}>
            </div>
        </div>

    </>
}