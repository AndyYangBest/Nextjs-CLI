export const generateRandomData = (dataKey: string) => {
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

  switch (dataKey) {
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

    case "radar-chart":
      return [
        { subject: "Math", A: 120, B: 110, fullMark: 150 },
        { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
        { subject: "English", A: 86, B: 130, fullMark: 150 },
        { subject: "Geography", A: 99, B: 100, fullMark: 150 },
        { subject: "Physics", A: 85, B: 90, fullMark: 150 },
        { subject: "History", A: 65, B: 85, fullMark: 150 },
      ];

    case "scatter-chart":
      return {
        data01: [
          { x: 100, y: 200, z: 200 },
          { x: 120, y: 100, z: 260 },
          { x: 170, y: 300, z: 400 },
          { x: 140, y: 250, z: 280 },
          { x: 150, y: 400, z: 500 },
          { x: 110, y: 280, z: 200 },
        ],
        data02: [
          { x: 300, y: 300, z: 200 },
          { x: 400, y: 500, z: 260 },
          { x: 200, y: 700, z: 400 },
          { x: 340, y: 350, z: 280 },
          { x: 560, y: 500, z: 500 },
          { x: 230, y: 780, z: 200 },
          { x: 500, y: 400, z: 200 },
          { x: 300, y: 500, z: 260 },
          { x: 240, y: 300, z: 400 },
          { x: 320, y: 550, z: 280 },
          { x: 500, y: 400, z: 500 },
          { x: 420, y: 280, z: 200 },
        ],
      };

    default:
      return null;
  }
};
