import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../actions/OrderAction";

export default function ChartDashBoard() {
  const dispatch = useDispatch();
  const allOrder = useSelector((state) => state.allOrder?.order);  // Add optional chaining here

  const numberOfOrdersOnMonth = (month) => {
    if (allOrder && Array.isArray(allOrder)) {  // Ensure allOrder is defined and an array
      return allOrder.filter((order) => {
        const orderMonth = new Date(order.createdAt).getMonth();  // Use a different variable name for clarity
        if (orderMonth + 1 === month) {
          return order;
        }
      }).length;
    }
    return 0;  // Default to 0 if allOrder is not available or not an array
  };

  useEffect(() => {
    dispatch(getAllOrder());  // Dispatch the action to fetch orders
  }, [dispatch]);

  const chartOptions = {
    series: [{
      name: 'Monthly bill',
      data: [
        numberOfOrdersOnMonth(1) + 7,
        numberOfOrdersOnMonth(2) + 4,
        numberOfOrdersOnMonth(3) + 7,
        numberOfOrdersOnMonth(4) + 5,
        numberOfOrdersOnMonth(5) + 3,
        numberOfOrdersOnMonth(6) + 14,
        numberOfOrdersOnMonth(7),
        numberOfOrdersOnMonth(8) + 8,
        numberOfOrdersOnMonth(9) + 8,
        numberOfOrdersOnMonth(10) + 18,
        numberOfOrdersOnMonth(11) + 20,
        numberOfOrdersOnMonth(12) + 11,
      ]
    }],
    options: {
      color: ['#6ab04c', '#2980b9'],
      chart: {
        background: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      legend: {
        position: 'top',
      },
      grid: {
        show: false,
      }
    }
  };

  return (
    <div className="dashboard-middle-chart">
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type='line'
        width="500"
      />
    </div>
  );
}
