// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BarChart as BarChartIcon,
//   DollarSign,
//   ShoppingBag,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
// } from "recharts";
// import { getProducts } from "../../services/Product";
// import { getPedidos } from "../../services/Pedidos";

// const Dashboard: React.FC = () => {
//   const [revenue, setRevenue] = useState(0);
//   const [orderCount, setOrderCount] = useState(0);
//   const [pedidos, setPedidos] = useState<any[]>([]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [monthlyRevenue, setMonthlyRevenue] = useState<
//     { month: string; revenue: number }[]
//   >([]);
//   const [weeklyRevenue, setWeeklyRevenue] = useState<
//     { week: string; revenue: number }[]
//   >([]);
//   const [dailyRevenue, setDailyRevenue] = useState<
//     { day: string; revenue: number }[]
//   >([]);
//   const [timeRange, setTimeRange] = useState<"month" | "week" | "day">("month");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productRes, pedidosRes] = await Promise.all([
//           getProducts(),
//           getPedidos(),
//         ]);

//         const products = productRes?.data || [];
//         const pedidos = Array.isArray(pedidosRes?.data) ? pedidosRes.data : [];

//         setProducts(products);
//         setPedidos(pedidos);

//         const pedidosPagados = pedidos.filter(
//           (p: any) =>
//             (p.estado === "pagado" && p.total > 0) ||
//             (p.estado === "entregado" && p.total > 0)
//         );

//         const now = new Date();
//         const currentMonth = now.getUTCMonth() + 1;
//         const currentYear = now.getUTCFullYear();

//         const pedidosDelMes = pedidosPagados.filter((p: any) => {
//           const fecha = new Date(p.fecha);
//           return (
//             fecha.getUTCFullYear() === currentYear &&
//             fecha.getUTCMonth() + 1 === currentMonth
//           );
//         });

//         const totalRevenue = pedidosDelMes.reduce(
//           (acc: number, p: any) => acc + (p.total || 0),
//           0
//         );

//         setRevenue(totalRevenue);
//         setOrderCount(pedidosDelMes.length);

//         processRevenueData(pedidosPagados);
//       } catch (error) {
//         console.error("Error cargando dashboard:", error);
//       }
//     };

//     const processRevenueData = (pedidosPagados: any[]) => {
//       const meses = [
//         "Ene",
//         "Feb",
//         "Mar",
//         "Abr",
//         "May",
//         "Jun",
//         "Jul",
//         "Ago",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dic",
//       ];
//       const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

//       const ingresosPorMes: { [key: string]: number } = {};
//       const monthlyData = [];

//       for (let i = 5; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(1);
//         date.setMonth(date.getMonth() - i);
//         const year = date.getFullYear();
//         const month = date.getMonth() + 1;
//         const key = `${year}-${month}`;
//         ingresosPorMes[key] = 0;
//       }

//       pedidosPagados.forEach((pedido: any) => {
//         const fecha = new Date(pedido.fecha);
//         const year = fecha.getUTCFullYear();
//         const month = fecha.getUTCMonth() + 1;
//         const key = `${year}-${month}`;
//         if (ingresosPorMes.hasOwnProperty(key)) {
//           ingresosPorMes[key] += pedido.total || 0;
//         }
//       });

//       for (let i = 5; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(1);
//         date.setMonth(date.getMonth() - i);
//         const year = date.getFullYear();
//         const month = date.getMonth() + 1;
//         const key = `${year}-${month}`;
//         monthlyData.push({
//           month: meses[month - 1],
//           revenue: ingresosPorMes[key] || 0,
//         });
//       }

//       setMonthlyRevenue(monthlyData);

//       const ingresosPorSemana: { [key: string]: number } = {};
//       const weeklyData = [];

//       for (let i = 3; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i * 7);
//         const weekNumber = getWeekNumber(date);
//         const key = `${date.getFullYear()}-W${weekNumber}`;
//         ingresosPorSemana[key] = 0;
//       }

//       pedidosPagados.forEach((pedido: any) => {
//         const fecha = new Date(pedido.fecha);
//         const weekNumber = getWeekNumber(fecha);
//         const key = `${fecha.getFullYear()}-W${weekNumber}`;
//         if (ingresosPorSemana.hasOwnProperty(key)) {
//           ingresosPorSemana[key] += pedido.total || 0;
//         }
//       });

//       for (let i = 3; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i * 7);
//         const weekNumber = getWeekNumber(date);
//         const key = `${date.getFullYear()}-W${weekNumber}`;
//         weeklyData.push({
//           week: `Sem ${weekNumber}`,
//           revenue: ingresosPorSemana[key] || 0,
//         });
//       }

//       setWeeklyRevenue(weeklyData);

//       const ingresosPorDia: { [key: string]: number } = {};
//       const dailyData = [];

//       for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const key = `${date.getFullYear()}-${
//           date.getMonth() + 1
//         }-${date.getDate()}`;
//         ingresosPorDia[key] = 0;
//       }

//       pedidosPagados.forEach((pedido: any) => {
//         const fecha = new Date(pedido.fecha);
//         const key = `${fecha.getFullYear()}-${
//           fecha.getMonth() + 1
//         }-${fecha.getDate()}`;
//         if (ingresosPorDia.hasOwnProperty(key)) {
//           ingresosPorDia[key] += pedido.total || 0;
//         }
//       });

//       for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const key = `${date.getFullYear()}-${
//           date.getMonth() + 1
//         }-${date.getDate()}`;
//         dailyData.push({
//           day: diasSemana[date.getDay()],
//           revenue: ingresosPorDia[key] || 0,
//         });
//       }

//       setDailyRevenue(dailyData);
//     };

//     const getWeekNumber = (date: Date) => {
//       const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//       const pastDaysOfYear =
//         (date.getTime() - firstDayOfYear.getTime()) / 86400000;
//       return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
//     };

//     fetchData();
//   }, []);

//   const stats = {
//     revenue,
//     orders: pedidos.length,
//     products: products.length,
//   };

//   const renderChart = () => {
//     switch (timeRange) {
//       case "month":
//         return (
//           <BarChart
//             data={monthlyRevenue}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <defs>
//               <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#4338ca" />
//                 <stop offset="100%" stopColor="#6366f1" />
//               </linearGradient>
//             </defs>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#e2e8f0"
//               opacity={0.3}
//             />
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12 }}
//               tickFormatter={(value) => `$${value.toLocaleString()}`}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(255, 255, 255, 0.95)",
//                 border: "none",
//                 borderRadius: "12px",
//                 boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                 backdropFilter: "blur(10px)",
//               }}
//               formatter={(value: any) => [
//                 `$${value.toLocaleString()}`,
//                 "Ingresos",
//               ]}
//               labelStyle={{ color: "#374151", fontWeight: 600 }}
//             />
//             <Bar
//               dataKey="revenue"
//               fill="url(#barGradient)"
//               radius={[8, 8, 0, 0]}
//               className="hover:opacity-80 transition-opacity duration-200"
//             />
//           </BarChart>
//         );
//       case "week":
//         return (
//           <AreaChart
//             data={weeklyRevenue}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#e2e8f0"
//               opacity={0.3}
//             />
//             <XAxis
//               dataKey="week"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12 }}
//               tickFormatter={(value) => `$${value.toLocaleString()}`}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(255, 255, 255, 0.95)",
//                 border: "none",
//                 borderRadius: "12px",
//                 boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                 backdropFilter: "blur(10px)",
//               }}
//               formatter={(value: any) => [
//                 `$${value.toLocaleString()}`,
//                 "Ingresos",
//               ]}
//               labelStyle={{ color: "#374151", fontWeight: 600 }}
//             />
//             <Area
//               type="monotone"
//               dataKey="revenue"
//               stroke="#6366f1"
//               fill="url(#areaGradient)"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         );
//       case "day":
//         return (
//           <LineChart
//             data={dailyRevenue}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="#e2e8f0"
//               opacity={0.3}
//             />
//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#64748b", fontSize: 12 }}
//               tickFormatter={(value) => `$${value.toLocaleString()}`}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(255, 255, 255, 0.95)",
//                 border: "none",
//                 borderRadius: "12px",
//                 boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//                 backdropFilter: "blur(10px)",
//               }}
//               formatter={(value: any) => [
//                 `$${value.toLocaleString()}`,
//                 "Ingresos",
//               ]}
//               labelStyle={{ color: "#374151", fontWeight: 600 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#6366f1"
//               strokeWidth={2}
//               dot={{ r: 4, fill: "#6366f1" }}
//               activeDot={{ r: 6, fill: "#4338ca" }}
//             />
//           </LineChart>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen 0p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
//               Panel de control
//             </h1>
//             <p className="text-gray-600">
//               Monitoreo en tiempo real de tu negocio
//             </p>
//           </div>
//           <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-sm text-gray-600 font-medium">En vivo</span>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {[
//           {
//             title: "Ingresos totales",
//             value: `$${stats.revenue.toLocaleString()}`,
//             icon: DollarSign,
//             color: "from-emerald-400 to-green-500",
//             bgColor: "from-emerald-50 to-green-50",
//             iconBg: "bg-emerald-100",
//             iconColor: "text-emerald-600",
//             trend: "+12.5%",
//           },
//           {
//             title: "Pedidos totales",
//             value: orderCount,
//             icon: ShoppingBag,
//             color: "from-blue-400 to-indigo-500",
//             bgColor: "from-blue-50 to-indigo-50",
//             iconBg: "bg-blue-100",
//             iconColor: "text-blue-600",
//             trend: "+8.2%",
//           },
//           {
//             title: "Productos",
//             value: stats.products,
//             icon: BarChartIcon,
//             color: "from-purple-400 to-pink-500",
//             bgColor: "from-purple-50 to-pink-50",
//             iconBg: "bg-purple-100",
//             iconColor: "text-purple-600",
//             trend: "+3.1%",
//           },
//         ].map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group`}
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-5">
//               <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
//             </div>

//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <div
//                   className={`p-3 ${stat.iconBg} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
//                 >
//                   <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-1 h-1 bg-green-400 rounded-full"></div>
//                   <span className="text-xs font-medium text-green-600">
//                     {stat.trend}
//                   </span>
//                 </div>
//               </div>

//               <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
//                 {stat.title}
//               </h3>
//               <p
//                 className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
//               >
//                 {stat.value}
//               </p>

//               {/* Mini Progress Bar */}
//               <div className="w-full bg-white/50 rounded-full h-1 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "75%" }}
//                   transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
//                   className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Chart Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 mb-8"
//       >
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Análisis de Ingresos
//             </h2>
//             <p className="text-gray-600">
//               {timeRange === "month" && "Tendencia de los últimos 6 meses"}
//               {timeRange === "week" && "Tendencia de las últimas 4 semanas"}
//               {timeRange === "day" && "Tendencia de los últimos 7 días"}
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setTimeRange("month")}
//               className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
//                 timeRange === "month"
//                   ? "bg-blue-500 text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               <div className="flex items-center space-x-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Mensual</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setTimeRange("week")}
//               className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
//                 timeRange === "week"
//                   ? "bg-blue-500 text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               <div className="flex items-center space-x-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Semanal</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setTimeRange("day")}
//               className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
//                 timeRange === "day"
//                   ? "bg-blue-500 text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               <div className="flex items-center space-x-1">
//                 <Clock className="w-4 h-4" />
//                 <span>Diario</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div className="h-96 relative">
//           {/* Grid Background */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="grid grid-cols-6 grid-rows-8 h-full w-full">
//               {Array.from({ length: 48 }).map((_, i) => (
//                 <div key={i} className="border border-gray-300"></div>
//               ))}
//             </div>
//           </div>

//           <ResponsiveContainer width="100%" height="100%">
//             {renderChart()}
//             <defs>
//               <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#3b82f6" />
//                 <stop offset="100%" stopColor="#6366f1" />
//               </linearGradient>
//               <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//           </ResponsiveContainer>
//         </div>
//       </motion.div>

//       {/* Additional Info Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.6 }}
//           className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
//         >
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Estado del Sistema
//           </h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Base de datos</span>
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span className="text-sm text-green-600 font-medium">
//                   Conectado
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">API Status</span>
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span className="text-sm text-green-600 font-medium">
//                   Operativo
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Última actualización</span>
//               <span className="text-sm text-gray-500">Hace 2 min</span>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.7 }}
//           className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
//         >
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Resumen Rápido
//           </h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Pedidos hoy</span>
//               <span className="text-lg font-bold text-blue-600">
//                 {Math.floor(orderCount * 0.3)}
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Productos activos</span>
//               <span className="text-lg font-bold text-green-600">
//                 {Math.floor(stats.products * 0.85)}
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Tasa de conversión</span>
//               <span className="text-lg font-bold text-purple-600">12.4%</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart as BarChartIcon,
  DollarSign,
  Calendar,
  Clock,
  Package,
  Activity,
  Database,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { getProducts } from "../../services/Product";
import { getPedidos } from "../../services/Pedidos";

interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  monthlyOrders: number;
  totalProducts: number;
  activeProducts: number;
  todayOrders: number;
  conversionRate: number;
  avgOrderValue: number;
  lowStockProducts: number;
}

interface ChartData {
  month: string;
  revenue: number;
  orders: number;
}

interface WeeklyData {
  week: string;
  revenue: number;
  orders: number;
}

interface DailyData {
  day: string;
  revenue: number;
  orders: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    monthlyOrders: 0,
    totalProducts: 0,
    activeProducts: 0,
    todayOrders: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    lowStockProducts: 0,
  });

  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [timeRange, setTimeRange] = useState<"month" | "week" | "day">("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState<
    { month: string; revenue: number }[]
  >([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState<
    { week: string; revenue: number }[]
  >([]);
  const [dailyRevenue, setDailyRevenue] = useState<
    { day: string; revenue: number }[]
  >([]);

  useEffect(() => {
    fetchDashboardData();

    // Actualización automática cada 5 minutos
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5 * 60 * 1000);

    // Verificar conexión
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productRes, pedidosRes] = await Promise.all([
        getProducts(),
        getPedidos(),
      ]);

      const products = productRes?.data || [];
      const pedidos = Array.isArray(pedidosRes?.data) ? pedidosRes.data : [];

      console.log("📊 Dashboard - Productos cargados:", products.length);
      console.log("📊 Dashboard - Pedidos cargados:", pedidos.length);

      // Procesar estadísticas
      const processedStats = processStats(products, pedidos);
      setStats(processedStats);

      // Procesar datos de gráficos
      const { monthly, weekly, daily } = processChartData(pedidos);
      setMonthlyData(monthly);
      setWeeklyData(weekly);
      setDailyData(daily);

      setLastUpdate(new Date());
      setIsOnline(true);
    } catch (error: any) {
      console.error("❌ Error cargando dashboard:", error);
      setError("Error al conectar con la base de datos. Reintentando...");
      setIsOnline(false);

      setTimeout(() => {
        fetchDashboardData();
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  const processStats = (products: any[], pedidos: any[]): DashboardStats => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const validPedidos = pedidos.filter((p: any) => {
      const isValidStatus = p.estado === "pagado" || p.estado === "entregado";
      const hasValidTotal = p.total && p.total > 0;
      return isValidStatus && hasValidTotal;
    });

    console.log("📊 Pedidos válidos procesados:", validPedidos.length);

    const totalRevenue = validPedidos.reduce(
      (sum, p) => sum + (p.total || 0),
      0
    );
    const totalOrders = validPedidos.length;

    const monthlyPedidos = validPedidos.filter((p: any) => {
      const orderDate = new Date(p.fecha);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const monthlyRevenue = monthlyPedidos.reduce(
      (sum, p) => sum + (p.total || 0),
      0
    );
    const monthlyOrders = monthlyPedidos.length;

    const todayPedidos = validPedidos.filter((p: any) => {
      const orderDate = new Date(p.fecha);
      const orderDateOnly = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      );
      return orderDateOnly.getTime() === today.getTime();
    });

    const todayOrders = todayPedidos.length;

    const activeProducts = products.filter(
      (p) => p.activo === true && p.stock > 0
    ).length;
    const lowStockProducts = products.filter(
      (p) => p.activo === true && p.stock <= 5 && p.stock > 0
    ).length;
    const totalProducts = products.length;

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const conversionRate =
      totalProducts > 0 ? (activeProducts / totalProducts) * 100 : 0;

    return {
      totalRevenue,
      monthlyRevenue,
      totalOrders,
      monthlyOrders,
      totalProducts,
      activeProducts,
      todayOrders,
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      avgOrderValue,
      lowStockProducts,
    };
  };

  const processChartData = (pedidos: any[]) => {
    const validPedidos = pedidos.filter((p: any) => {
      const isValidStatus = p.estado === "pagado" || p.estado === "entregado";
      const hasValidTotal = p.total && p.total > 0;
      return isValidStatus && hasValidTotal;
    });

    // Datos mensuales (últimos 6 meses)
    const monthly = generateMonthlyData(validPedidos);

    // Datos semanales (últimas 4 semanas)
    const weekly = generateWeeklyData(validPedidos);

    // Datos diarios (últimos 7 días)
    const daily = generateDailyData(validPedidos);

    return { monthly, weekly, daily };
  };

  const generateMonthlyData = (pedidos: any[]): ChartData[] => {
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const data: ChartData[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      date.setDate(1);

      const monthPedidos = pedidos.filter((p: any) => {
        const orderDate = new Date(p.fecha);
        return (
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      });

      data.push({
        month: months[date.getMonth()],
        revenue: monthPedidos.reduce((sum, p) => sum + (p.total || 0), 0),
        orders: monthPedidos.length,
      });
    }

    return data;
  };

  const generateWeeklyData = (pedidos: any[]): WeeklyData[] => {
    const data: WeeklyData[] = [];

    for (let i = 3; i >= 0; i--) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - i * 7);
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);

      const weekPedidos = pedidos.filter((p: any) => {
        const orderDate = new Date(p.fecha);
        return orderDate >= startDate && orderDate <= endDate;
      });

      const weekNumber = getWeekNumber(endDate);

      data.push({
        week: `Sem ${weekNumber}`,
        revenue: weekPedidos.reduce((sum, p) => sum + (p.total || 0), 0),
        orders: weekPedidos.length,
      });
    }

    return data;
  };

  const generateDailyData = (pedidos: any[]): DailyData[] => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const data: DailyData[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const dayPedidos = pedidos.filter((p: any) => {
        const orderDate = new Date(p.fecha);
        return orderDate >= date && orderDate <= endDate;
      });

      data.push({
        day: days[date.getDay()],
        revenue: dayPedidos.reduce((sum, p) => sum + (p.total || 0), 0),
        orders: dayPedidos.length,
      });
    }

    return data;
  };

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Ahora mismo";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;

    return date.toLocaleDateString("es-CL");
  };

  // const renderChart = () => {
  //   switch (timeRange) {
  //     case "month":
  //       return (
  //         <BarChart
  //           data={monthlyRevenue}
  //           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  //         >
  //           <defs>
  //             <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
  //               <stop offset="0%" stopColor="#4338ca" />
  //               <stop offset="100%" stopColor="#6366f1" />
  //             </linearGradient>
  //           </defs>
  //           <CartesianGrid
  //             strokeDasharray="3 3"
  //             stroke="#e2e8f0"
  //             opacity={0.3}
  //           />
  //           <XAxis
  //             dataKey="month"
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
  //           />
  //           <YAxis
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12 }}
  //             tickFormatter={(value) => `$${value.toLocaleString()}`}
  //           />
  //           <Tooltip
  //             contentStyle={{
  //               backgroundColor: "rgba(255, 255, 255, 0.95)",
  //               border: "none",
  //               borderRadius: "12px",
  //               boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  //               backdropFilter: "blur(10px)",
  //             }}
  //             formatter={(value: any) => [
  //               `$${value.toLocaleString()}`,
  //               "Ingresos",
  //             ]}
  //             labelStyle={{ color: "#374151", fontWeight: 600 }}
  //           />
  //           <Bar
  //             dataKey="revenue"
  //             fill="url(#barGradient)"
  //             radius={[8, 8, 0, 0]}
  //             className="hover:opacity-80 transition-opacity duration-200"
  //           />
  //         </BarChart>
  //       );
  //     case "week":
  //       return (
  //         <AreaChart
  //           data={weeklyRevenue}
  //           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  //         >
  //           <CartesianGrid
  //             strokeDasharray="3 3"
  //             stroke="#e2e8f0"
  //             opacity={0.3}
  //           />
  //           <XAxis
  //             dataKey="week"
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
  //           />
  //           <YAxis
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12 }}
  //             tickFormatter={(value) => `$${value.toLocaleString()}`}
  //           />
  //           <Tooltip
  //             contentStyle={{
  //               backgroundColor: "rgba(255, 255, 255, 0.95)",
  //               border: "none",
  //               borderRadius: "12px",
  //               boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  //               backdropFilter: "blur(10px)",
  //             }}
  //             formatter={(value: any) => [
  //               `$${value.toLocaleString()}`,
  //               "Ingresos",
  //             ]}
  //             labelStyle={{ color: "#374151", fontWeight: 600 }}
  //           />
  //           <Area
  //             type="monotone"
  //             dataKey="revenue"
  //             stroke="#6366f1"
  //             fill="url(#areaGradient)"
  //             strokeWidth={2}
  //           />
  //         </AreaChart>
  //       );
  //     case "day":
  //       return (
  //         <LineChart
  //           data={dailyRevenue}
  //           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  //         >
  //           <CartesianGrid
  //             strokeDasharray="3 3"
  //             stroke="#e2e8f0"
  //             opacity={0.3}
  //           />
  //           <XAxis
  //             dataKey="day"
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
  //           />
  //           <YAxis
  //             axisLine={false}
  //             tickLine={false}
  //             tick={{ fill: "#64748b", fontSize: 12 }}
  //             tickFormatter={(value) => `$${value.toLocaleString()}`}
  //           />
  //           <Tooltip
  //             contentStyle={{
  //               backgroundColor: "rgba(255, 255, 255, 0.95)",
  //               border: "none",
  //               borderRadius: "12px",
  //               boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  //               backdropFilter: "blur(10px)",
  //             }}
  //             formatter={(value: any) => [
  //               `$${value.toLocaleString()}`,
  //               "Ingresos",
  //             ]}
  //             labelStyle={{ color: "#374151", fontWeight: 600 }}
  //           />
  //           <Line
  //             type="monotone"
  //             dataKey="revenue"
  //             stroke="#6366f1"
  //             strokeWidth={2}
  //             dot={{ r: 4, fill: "#6366f1" }}
  //             activeDot={{ r: 6, fill: "#4338ca" }}
  //           />
  //         </LineChart>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // Elimina estas líneas que no se están usando:
  // const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number }[]>([]);
  // const [weeklyRevenue, setWeeklyRevenue] = useState<{ week: string; revenue: number }[]>([]);
  // const [dailyRevenue, setDailyRevenue] = useState<{ day: string; revenue: number }[]>([]);

  // Y corrige la función renderChart():
  const renderChart = () => {
    let data: any[] = [];
    let dataKey = "revenue";

    switch (timeRange) {
      case "month":
        data = monthlyData;
        break;
      case "week":
        data = weeklyData;
        break;
      case "day":
        data = dailyData;
        break;
    }

    console.log(`📊 Datos del gráfico (${timeRange}):`, data); // Para debug

    switch (timeRange) {
      case "month":
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              formatter={(value: any) => [formatCurrency(value), "Ingresos"]}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Bar
              dataKey={dataKey}
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        );
      case "week":
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.3}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              formatter={(value: any) => [formatCurrency(value), "Ingresos"]}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#6366f1"
              fill="url(#areaGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        );
      case "day":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.3}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              formatter={(value: any) => [formatCurrency(value), "Ingresos"]}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4, fill: "#6366f1" }}
              activeDot={{ r: 6, fill: "#4338ca" }}
            />
          </LineChart>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No hay datos disponibles</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando con la base de datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
            <Database className="w-6 h-6 mx-auto mb-2" />
            <p>{error}</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Reconectar
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Ingresos del Mes",
      value: formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      color: "from-emerald-400 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: stats.monthlyRevenue > 0 ? "+12.5%" : "0%",
      subtitle: `${stats.monthlyOrders} pedidos este mes`,
    },
    {
      title: "Valor Promedio Pedido",
      value: formatCurrency(stats.avgOrderValue),
      icon: Activity,
      color: "from-blue-400 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: stats.avgOrderValue > 0 ? "+8.2%" : "0%",
      subtitle: `${stats.todayOrders} pedidos hoy`,
    },
    {
      title: "Productos Activos",
      value: `${stats.activeProducts}/${stats.totalProducts}`,
      icon: Package,
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+3.1%",
      subtitle: `${stats.lowStockProducts} con stock bajo`,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Panel de Control
            </h1>
            <p className="text-gray-600">
              Monitoreo en tiempo real de MITINGÜ ^_−☆
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200">
            <div
              className={`w-2 h-2 ${
                isOnline ? "bg-green-400" : "bg-red-400"
              } rounded-full ${isOnline ? "animate-pulse" : ""}`}
            ></div>
            <span className="text-sm text-gray-600 font-medium">
              {isOnline ? "Conectado" : "Desconectado"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 ${stat.iconBg} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span className="text-xs font-medium text-green-600">
                    {stat.trend}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                {stat.title}
              </h3>
              <p
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
              >
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>

              <div className="w-full bg-white/50 rounded-full h-1 overflow-hidden mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Análisis de Ingresos
            </h2>
            <p className="text-gray-600">
              {timeRange === "month" &&
                `Tendencia de los últimos 6 meses • Total: ${formatCurrency(
                  monthlyData.reduce((sum, item) => sum + item.revenue, 0)
                )}`}
              {timeRange === "week" &&
                `Tendencia de las últimas 4 semanas • Total: ${formatCurrency(
                  weeklyData.reduce((sum, item) => sum + item.revenue, 0)
                )}`}
              {timeRange === "day" &&
                `Tendencia de los últimos 7 días • Total: ${formatCurrency(
                  dailyData.reduce((sum, item) => sum + item.revenue, 0)
                )}`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {[
              { key: "month", label: "Mensual", icon: Calendar },
              { key: "week", label: "Semanal", icon: Calendar },
              { key: "day", label: "Diario", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTimeRange(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeRange === key
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Estado del Sistema
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Base de datos</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 ${
                    isOnline ? "bg-green-400" : "bg-red-400"
                  } rounded-full`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    isOnline ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOnline ? "Conectado" : "Error de conexión"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Status</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 ${
                    isOnline ? "bg-green-400" : "bg-red-400"
                  } rounded-full`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    isOnline ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOnline ? "Operativo" : "Inactivo"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Última actualización</span>
              <span className="text-sm text-gray-500">
                {formatTimeAgo(lastUpdate)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resumen Rápido
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pedidos hoy</span>
              <span className="text-lg font-bold text-blue-600">
                {stats.todayOrders}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Productos activos</span>
              <span className="text-lg font-bold text-green-600">
                {stats.activeProducts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stock bajo</span>
              <span
                className={`text-lg font-bold ${
                  stats.lowStockProducts > 0
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {stats.lowStockProducts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tasa de conversión</span>
              <span className="text-lg font-bold text-purple-600">
                {stats.conversionRate}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
