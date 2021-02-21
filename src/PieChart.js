import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const data = [
  {
    name: "Сірий",
    percentage: 45,
    color: "gray",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Жовтий",
    percentage: 15,
    color: "orange",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Коричневий",
    percentage: 25,
    color: "brown",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Червоний",
    percentage: 10,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Фіолетовий",
    percentage: 5,
    color: "purple",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },

];

const MyPieChart = () => {
  return (
    <PieChart
      data={data}
      width={Dimensions.get("window").width - 16}
      height={220}
      chartConfig={{ color: (opacity = 255) => `rgba(3, 182, 252, ${opacity})` }}
      accessor={"percentage"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[10, 20]}
      absolute
    />
  );
};

export default MyPieChart;
