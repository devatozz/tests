"use client"
import Script from "next/script";
import { useEffect } from "react"
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, LineController, PointElement, Scale } from 'chart.js';
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


    let chartRef = null;
    const onLoadChart = () => {
        console.log('data: ', data);
        const newData = [
            115.62001137011,
            47029.96569899208,
            6632.63785648282,
            4141.0273060772,
            45479.27153522809,
            6632.31314804979,
            4100.21009651497,
            4668.73796928371,
            45972.599684783585,
            423.92960550481,
            42620.73810818898,
            848.47451640749,
            4217.99980499583,
            753.68155974889
        ]
        const ctx = document.getElementById('btc-chart');
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: "red",
                    borderWidth: 1,
                    radius: 0,
                    data: newData,
                    minBarLength: 0.1
                },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,

                    },
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: false
                    },
                    y: {
                        type: 'linear',
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
        <div style={{ width: "500px", height: "400px", position: "relative", border: '1px solid gray' }}>
            <canvas id="btc-chart" height={'400px'} width={'500px'} style={{ position: 'absolute', top: 0, left: '15px' }}></canvas>

            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1, width: "100%", height: "100%" }}>
            </div>
        </div>

    </>
}