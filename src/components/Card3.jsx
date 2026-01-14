import { Users, Droplet, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios/useAxios";

const Card3 = () => {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState(0);
  const [payment, setPayment] = useState([]);
  const [donars, setDonars] = useState(0);

  // Fetch donors
  useEffect(() => {
    axiosInstance.get("/donar-requests")
      .then(res => setDonars(res.data.length))
      .catch(err => console.log(err));
  }, [axiosInstance]);

  // Fetch users count
  useEffect(() => {
    axiosInstance.get("/users/count")
      .then(res => setUsers(res.data.length))
      .catch(err => console.log(err));
  }, [axiosInstance]);

  // Fetch payments
  useEffect(() => {
    axiosInstance.get("/payments")
      .then(res => setPayment(res.data))
      .catch(err => console.log(err));
  }, [axiosInstance]);

  const totalFunding = payment.reduce((total, item) => total + item.amount, 0);

  const stats = [
    {
      title: "Total Donors",
      count: users,
      icon: <Users className="w-8 h-8 text-red-600" />,
      bg: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Total Funding (BDT)",
      count: totalFunding,
      icon: <HandCoins className="w-8 h-8 text-green-600" />,
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Blood Donation Requests",
      count: donars,
      icon: <Droplet className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Here’s a quick overview of your blood donation platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-sm border flex items-center justify-between transition-colors ${item.bg} border-gray-200 dark:border-gray-700`}
          >
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {item.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                {item.count}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow flex items-center justify-center">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card3;
