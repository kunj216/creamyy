import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, [user]);

  const chartData = {
    labels: ["Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Platform Overview",
        data: [
          stats.totalUsers,
          stats.totalOrders,
          stats.totalRevenue
        ],
        backgroundColor: [
          "#fda4af",
          "#c084fc",
          "#a5b4fc"
        ]
      }
    ]
  };

  return (
    <div className="bg-rose-50 min-h-screen p-12">

      <h1 className="text-4xl font-heading font-bold text-gray-900 mb-12">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">
            ₹ {stats.totalRevenue}
          </p>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <Bar data={chartData} />
      </div>

    </div>
  );
}

export default AdminDashboard;
