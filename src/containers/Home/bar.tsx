import React from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const Bar: React.FC = () => {
  let chartDom = React.useRef(null);
  let chartInstance: echarts.ECharts | null = null;

  const initCharts = () => {
    const myChart = echarts.getInstanceByDom(
      (chartDom.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (chartDom.current as unknown) as HTMLDivElement
      );
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ["利润", "支出", "收入"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          axisTick: {
            show: false,
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      series: [
        {
          name: "利润",
          type: "bar",
          label: {
            show: true,
            position: "inside",
          },
          emphasis: {
            focus: "series",
          },
          data: [200, 170, 240, 244, 200, 220, 210],
        },
        {
          name: "收入",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 302, 341, 374, 390, 450, 420],
        },
        {
          name: "支出",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "left",
          },
          emphasis: {
            focus: "series",
          },
          data: [-120, -132, -101, -134, -190, -230, -210],
        },
      ],
    };
    option && chartInstance.setOption(option);
  };
  React.useEffect(() => {
    initCharts();
  });
  return (
    <>
      <div style={{ fontSize: 16, marginBottom: 40, textAlign: "center" }}>
        上周的收入、支出和利润
      </div>
      <div ref={chartDom} style={{ width: 600, height: 500 }}></div>
    </>
  );
};
export default Bar;
