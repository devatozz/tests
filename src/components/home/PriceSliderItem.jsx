"use client"
import {
    Box,
    Text,
    Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CurrencyFormater, removeLastZezo } from "src/utils/PriceFormater";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, LineController, PointElement } from 'chart.js';
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    LineController,
    PointElement);

const DEFAULT_CHART_CONFIG = {
    type: 'line',
    data: {},
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
                display: false,
            },
            y: {
                display: false
            }
        }
    }
};
export default function PriceSliderItem({ tokenData }) {
    const symbol = tokenData.symbol;
    const [token, setToken] = useState(tokenData);

    let chartInstance = undefined;
    function initChart(item) {
        const chartElement = document.getElementById("chart_" + symbol);
        if (!chartElement) return;
        const config = {
            ...DEFAULT_CHART_CONFIG, data: {
                labels: item.priceHistory.map((_, j) => j),
                datasets: [{
                    borderColor: item.priceChangePercent < 0 ? "red" : "green",
                    borderWidth: 1,
                    radius: 0,
                    data: item.priceHistory,
                },
                ]
            }
        };
        if (chartInstance)
            chartInstance.destroy();
        chartInstance = new Chart(chartElement, config);
    }
    useEffect(() => {
        fetch("/api/home/getTradingWidgetInfo?symbol=" + symbol)
            .then(res => res.json())
            .then(result => {
                console.log("detail ", result);
                setToken({
                    ...token,
                    ...result
                });
                initChart(result)
            });
    }, []);

    return <Box
        borderRadius={"8px"}
        border={"1px solid #FCFDC7"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={6}
        width={"100%"}
        height={{ base: "200px", xl: "220px" }}
        paddingX={"20px"}
        paddingY={"28px"}
    >
        <Box width={"45%"} height={"100%"} alignContent={"space-between"} display={"grid"} gap={5}>
            <Box display={"flex"}
                justifyContent={{ base: "center", xl: "flex-start" }}
                alignItems={"center"}
                justifyItems={"center"}
                height={{ base: "70px", xl: "80px" }}
            >
                <Image width={{ base: "50px", xl: "60px" }} height={{ base: "50px", xl: "60px" }} borderRadius={"50%"} p={"5px"} src={token.image} alt={token.name} />
                <Box fontWeight={"700"} textAlign={"left"}>
                    <Text color={"#FCFDC7"}
                        fontSize={{ base: "20px", xl: "25px" }}
                        fontFamily="Lakes"
                        fontStyle={"normal"}>{token.symbol}</Text>
                    <Text color={"#FCFDC7"}
                        fontSize={{ base: "12px", xl: "16px" }}
                        fontFamily="Lakes">{token.name}</Text>
                </Box>
            </Box>

            <Box display={"flex"} justifyContent={{ base: "center", xl: "flex-start" }}>
                <Text color={"#FCFDC7"}
                    fontSize={{ base: "12px", xl: "14px" }}
                    fontFamily="Lakes">${removeLastZezo(token.lastPrice)}</Text>
            </Box>
        </Box>

        <Box width={"50%"} height={"100%"} alignContent={"space-between"} display={"grid"} gap={5}>
            <Box position={'relative'}
                display={'flex'} alignContent={'center'}
                height={{ base: "70px", xl: "80px" }}>
                <canvas id={"chart_" + symbol}
                    width={400}
                    style={{
                        position: 'absolute',
                        top: 0, left: '20%',
                    }}></canvas>
            </Box>

            <Box >
                <Box display={"flex"} gap={5} justifyContent={{ base: "center", xl: "flex-end" }}>
                    <Text color={"#FCFDC7"}
                        fontSize={{ base: "12px", xl: "14px" }}
                        fontFamily="Lakes"
                        opacity={"0.6"}
                    >PRICE</Text>

                    <Box display={"flex"} gap={1} >
                        {
                            Number(token.priceChangePercent) <= 0 ?
                                <svg style={{ marginTop: "5px" }} width="10" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.28674 7.69154C5.63555 8.18243 6.36445 8.18243 6.71326 7.69154L11.0803 1.5459C11.4919 0.966549 11.0777 0.164062 10.367 0.164062H1.633C0.922276 0.164062 0.508057 0.966548 0.919733 1.5459L5.28674 7.69154Z" fill="#F45353" />
                                </svg>
                                :
                                <svg style={{ marginTop: "5px" }} width="10" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.28674 1.32408C5.63555 0.833193 6.36445 0.833193 6.71326 1.32408L11.0803 7.46973C11.4919 8.04908 11.0777 8.85156 10.367 8.85156H1.633C0.922276 8.85156 0.508057 8.04908 0.919733 7.46973L5.28674 1.32408Z" fill="#58FF5D" />
                                </svg>
                        }

                        <Text color={Number(token.priceChangePercent) <= 0 ? "#F45353" : "#58FF5D"}
                            fontSize={{ base: "12px", xl: "14px" }}
                            fontFamily="Lakes">{removeLastZezo(token.priceChangePercent)}%</Text>
                    </Box>
                </Box>

                <Box display={"flex"} gap={10} justifyContent={{ base: "center", xl: "flex-end" }}>
                    <Text color={"#FCFDC7"}
                        fontSize={{ base: "12px", xl: "14px" }}
                        fontFamily="Lakes"
                        opacity={"0.6"}>VOL</Text>
                    <Text color={"#FCFDC7"}
                        fontSize={{ base: "12px", xl: "14px" }}
                        fontFamily="Lakes">
                        {CurrencyFormater(token.volume)}</Text>
                </Box>
            </Box>
        </Box>


    </Box>
}