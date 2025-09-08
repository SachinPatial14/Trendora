import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const Charts = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/getallorders");
        const grouped = {};
        res.data.forEach(order => {
          const date = new Date(order.orderDate).toLocaleDateString();
          if (!grouped[date]) grouped[date] = 0;
          grouped[date] += order.orders.reduce((sum, o) => sum + o.amount, 0); 
        });

        const formatted = Object.keys(grouped).map(date => ({
          date,
          sales: grouped[date],
        }));

        setOrdersData(formatted);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    const fetchSummary = async () => {
      try {
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:4000/totalproducts"),
          axios.get("http://localhost:4000/totalusers"),
          axios.get("http://localhost:4000/totalorders"),
        ]);

        const summary = [
          { subject: "Products", count: productsRes.data, fullMark: 200 },
          { subject: "Users", count: usersRes.data, fullMark: 200 },
          { subject: "Orders", count: ordersRes.data, fullMark: 200 },
        ];

        setSummaryData(summary);
      } catch (err) {
        console.error("Error fetching summary", err);
      }
    };

    fetchOrders();
    fetchSummary();
  }, []);

  return (
    <div className="charts-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
      <div className="chart-box" style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2>Sales Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="chart-box" style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2>System Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={summaryData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Count" dataKey="count" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
