// 生成随机数据的工具函数
export function generateRandomData(widgetId: string) {
  switch (widgetId) {
    case "overview":
      return Array.from({ length: 12 }, (_, i) => ({
        name: [
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
        ][i],
        total: Math.floor(Math.random() * 5000) + 1000,
      }));

    case "recentSales":
      return Array.from({ length: 5 }, () => ({
        name: [
          "Olivia Martin",
          "Jackson Lee",
          "Isabella Nguyen",
          "William Kim",
          "Sofia Davis",
        ][Math.floor(Math.random() * 5)],
        email: "user@example.com",
        amount: `$${(Math.random() * 2000 + 100).toFixed(2)}`,
      }));

    // Add more cases for different widget types

    default:
      return null;
  }
}
