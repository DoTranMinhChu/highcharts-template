import { Utils } from "@/common/utils";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useEffect, useState } from "react";

// Highcharts.seriesTypes.scatter.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline;
const milisecondsOneDate = 86400000
interface ISelectors {
    value: string,
    durationYear?: number
    durationMonth?: number
    tickInterval: number
    selected: boolean
}
export default function LineChart01() {
    const [selectors, setSelectors] = useState<ISelectors[]>([
        {
            value: '3M',
            durationYear: 0,
            durationMonth: 3,
            selected: false,
            tickInterval: 24 * 3600 * 1000 * 7 * 3
        },
        {
            value: '6M',
            durationYear: 0,
            durationMonth: 6,
            tickInterval: 24 * 3600 * 1000 * 30,
            selected: false,
        },
        {
            value: '1Y',
            durationYear: 1,
            durationMonth: 0,
            tickInterval: 24 * 3600 * 1000 * 30,
            selected: true,
        },
        {
            value: '3Y',
            durationYear: 3,
            durationMonth: 0,
            tickInterval: 31556926000 / 2,
            selected: false,
        },
        {
            value: '5Y',
            durationYear: 5,
            durationMonth: 0,
            tickInterval: 31556926000,
            selected: false,
        },
        {
            value: 'ALL',
            durationYear: 10,
            durationMonth: 0,
            tickInterval: 31556926000,
            selected: false,
        }

    ]);
    const [optionsHighcharts, setOptionsHighCharts] = useState<Highcharts.Options>()
    const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);
    const [xAxisDuration, setXAxisDuration] = useState<{ min: number, max: number, tickInterval: number }>()
    const color = {
        night: {
            light: "#251F47",
            dark: "#131129"
        },
        green: "#399652",
        red: "#CF4627",
        white: {
            default: "#FFF",
            dark: "#F7F7F7"
        },
        purple: {
            default: "#6F4EF2"
        }
    }
    const reRenderSeriesChart = () => {
        const selected = selectors[selectors.findIndex((item: ISelectors) => item.selected)];
        const now = new Date();
        const currentYear = now.getUTCFullYear();
        const currentMonth = now.getUTCMonth();
        const currentDate = now.getUTCDate();
        const startYear = currentYear - selected.durationYear!!
        const startMonth = currentMonth - selected.durationMonth!!
        console.log({
            currentYear,
            currentMonth,
            currentDate
        })
        const startTime = Date.UTC(startYear, startMonth, currentDate);
        const endTime = Date.UTC(currentYear, currentMonth, currentDate);

        setXAxisDuration({ min: startTime, max: endTime, tickInterval: selected.tickInterval })
        setSeries([
            {
                name: 'Giá thức ăn cho cá tra',
                type: "spline",
                data: Utils.getListsDataPerDate(startTime, endTime, 86400000, 500),
                color: color.red,

            },
            {
                name: 'Giá cá giống',
                type: "spline",
                data: Utils.getListsDataPerDate(startTime, endTime, 86400000, 800),
                color: color.green
            }
        ])

    }
    const reRenderChart = () => {
        const options: Highcharts.Options = {
            chart: {
                type: 'spline',
                backgroundColor: color.night.light,
                height: 600
            },
            title: {
                text: 'Giá nguyên vật liệu đầu vào nuôi cá',
                align: 'left',
                style: {
                    color: color.white.default,
                    fontFamily: "Roboto"
                },
                margin: 100
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        color: color.white.default
                    },

                },
                crosshair: true,
                dateTimeLabelFormats: {
                    month: '%b \'%y',
                    year: '%Y'
                },
                min: xAxisDuration?.min,
                max: xAxisDuration?.max,
                allowDecimals: false,
                tickInterval: xAxisDuration?.tickInterval,
                margin: 100,

            },
            plotOptions: {
                series: {
                    marker: {
                        symbol: 'arc',
                    }
                },

            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                itemStyle: {
                    color: color.white.default,
                    height: 20
                },
                itemHoverStyle: {
                    color: color.white.dark
                },
                symbolWidth: 20,
                symbolHeight: 20,

            },
            yAxis: {
                title: {
                    text: 'Values',
                    style: {
                        color: color.white.default
                    }
                },
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        color: color.white.default
                    }
                },
                gridLineWidth: 0,

            },
            series: series

        };
        setOptionsHighCharts(options)
    }
    useEffect(() => {
        reRenderSeriesChart();
    }, [selectors])
    useEffect(() => {
        reRenderChart();
    }, [series])


    const handleSelect = (itemSelect: ISelectors) => {
        const newSelector = selectors.map((item: ISelectors) => {
            item.selected = false
            if (item.value == itemSelect.value) {
                item.selected = true
            }
            return item
        });
        setSelectors(newSelector)
    }
    return (
        <div className="relative">
            <HighchartsReact highcharts={Highcharts} options={optionsHighcharts} />
            <div className="absolute top-0 right-0 flex gap-4 mx-6 my-4">
                {selectors.map((item: ISelectors) => {
                    return (
                        <button className="p-2 rounded-md" onClick={() => handleSelect(item)} style={{ backgroundColor: !item.selected ? color.night.dark : color.purple.default }} key={item.value}>{item.value}</button>
                    )
                })}


            </div>

        </div>

    );
}