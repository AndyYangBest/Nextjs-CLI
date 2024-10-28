// Dashboard data generator
export const generateRandomData = (widgetId: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  switch (widgetId) {
    case "visitors-revenue":
      return {
        chartData: months.map((month) => ({
          name: month,
          Primary: Math.floor(Math.random() * 3000) + 2000,
          Accent: Math.floor(Math.random() * 2000) + 1500,
          Neutral: Math.floor(Math.random() * 1000) + 500,
        })),
        stats: {
          visitors: {
            count: 56493,
            change: 36,
          },
          revenue: {
            count: 4300,
            change: -36,
          },
          savings: {
            count: 1300,
            change: 6,
          },
        },
      };

    case "crypto-chart":
      // Generate 6 months of daily data
      return Array.from({ length: 180 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString().slice(0, 10),
          price: Math.random() * 5000 + 45000,
        };
      }).reverse();

    case "radial-chart":
      return [
        { name: "Videos", uv: 31.47, pv: 1900, fill: "var(--dv-primary-300)" },
        { name: "Docs", uv: 31.47, pv: 1900, fill: "var(--dv-primary-500)" },
        { name: "Photos", uv: 26.69, pv: 1500, fill: "var(--dv-primary-700)" },
        {
          name: "Messages",
          uv: 15.69,
          pv: 1400,
          fill: "var(--dv-primary-900)",
        },
      ];

    case "category-chart":
      return {
        categories: [
          {
            name: "Running",
            uv: 31.47,
            pv: 2400,
            fill: "var(--dv-primary-900)",
          },
          {
            name: "Swimming",
            uv: 26.69,
            pv: 4567,
            fill: "var(--dv-primary-600)",
          },
          {
            name: "Weightlifting",
            uv: 8.22,
            pv: 9800,
            fill: "var(--dv-primary-300)",
          },
        ],
        data: [
          {
            name: "consumption",
            Running: 2400,
            Swimming: 4567,
            Weightlifting: 9800,
          },
        ],
      };

    case "small-charts":
      return {
        orders: {
          count: 639400,
          change: 36,
          data: months.map((month) => ({
            name: month,
            Primary: Math.floor(Math.random() * 1000) + 500,
          })),
        },
        customers: {
          count: 478000,
          change: -13,
          data: months.map((month) => ({
            name: month,
            Accent: Math.floor(Math.random() * 800) + 300,
          })),
        },
      };

    default:
      return null;
  }
};
