import React from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart, PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
]);
const Pie: React.FC = () => {
  let chartDom = React.useRef(null);
  let chartInstance: echarts.ECharts | null = null;
  let initCharts = () => {
    const myChart = echarts.getInstanceByDom(
      (chartDom.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (chartDom.current as unknown) as HTMLDivElement
      );

    let option = {
      legend: {},
      tooltip: {
        trigger: "axis",
        showContent: false,
      },
      dataset: {
        source: [
          ["product", "2015", "2016", "2017", "2018", "2019", "2020"],
          ["刹车分泵", 56, 82, 88, 70, 53, 85],
          ["机油冷却器", 51, 51, 55, 53, 73, 68],
          ["变速器", 40, 62, 69, 36, 45, 32],
          ["轮胎", 25, 37.1, 41, 18, 33, 49],
        ],
      },
      xAxis: { type: "category" },
      yAxis: { gridIndex: 0 },
      grid: { top: "60%" },
      series: [
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        },
        {
          type: "pie",
          id: "pie",
          radius: "30%",
          center: ["50%", "25%"],
          emphasis: { focus: "data" },
          label: {
            formatter: "{b}: {@2015} ({d}%)",
          },
          encode: {
            itemName: "product",
            value: "2015",
            tooltip: "2015",
          },
        },
      ],
    };
    chartInstance.on("updateAxisPointer", (event: any) => {
      var xAxisInfo = event?.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo?.value + 1;
        chartInstance?.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });
    chartInstance?.setOption(option);
  };

  React.useEffect(() => {
    initCharts();
  });
  return (
    <>
      <div style={{ fontSize: 16, marginBottom: 40, textAlign: "center" }}>
        2015~2020年各零部件的消耗情况
      </div>
      <div ref={chartDom} style={{ width: 600, height: 500 }}></div>
    </>
  );
};
export default Pie;
