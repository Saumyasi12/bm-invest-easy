 export const dataSource: any={
    chart: {
      theme: "fusion",
      showValues: "1",
      valueFontColor: "#ffffff",
     // baseFont: "Arial",
      //labelFont: "Arial",
      baseFontSize: "14",
      labelFontSize: "12",
      labelFontColor: "#000000",
      labelFontBold: "0",
      //paletteColors: "#92D050,#0D2747",
      bgColor: "#F2F2F2",
      bgAlpha: "0",
      divLineAlpha: "0",
      showCanvasBorder: "0",
      usePlotGradientColor: "0",

      plotBorderAlpha: "0",
      legendBorderAlpha: "0",
     // legendItemFontSize: "12px",
      legendShadow: "0",
      showYAxisValues: "0",
      showToolTip: "1",
      legendPadding: "0px",
      labelPadding: "0",
      showXAxisLine: "0",
      // xAxisLineColor: "#999999",
      divlineColor: "#999999",
      divLineIsDashed: "1",
      showLabels: "0",
      legendMargin: "0px",
      plotToolText: "$seriesname",
      showlegend: "1",

      //margins

      showPercentValues: "0",
     // chartLeftMargin: "30",
     // chartTopMargin: "10",
     // chartRightMargin: "25",
      //chartBottomMargin: "0",
      legendNumColumns: "0",
      // Use Pattern Property
     // usePattern: "1",
      //patternType: "circle",
      //color: "#00ff99"
      patternSize: 1,
      patternDensity: 0.25,
      toolbarPosition: "BL",

    },
    categories: [
      {
        category: [
          {
            label: "RIYADH"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "Processed",
        color: "#92D050",
        patternangle: "60",
        patternbgcolor: "#FFFFFF",
        data: [
          {
            value: "16"
          }
        ]
      },
      {
        seriesname: "Business Rule Exception",
        color: "#0D274D",
        patternangle: "60",
        patternbgcolor: "#FFFFFF",
        showValues: "1",
        data: [
          {
            value: "02"
          }
        ]
      },
      {
        seriesname: "Application Exception",
        color: "#C00000",
        patternangle: "60",
        patternbgcolor: "#FFFFFF",
        showValues: "1",
        data: [
          {
            value: "01"
          }
        ]
      }

    ]
  };

