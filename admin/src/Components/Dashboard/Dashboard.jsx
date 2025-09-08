import React from "react";
import "./Dashboard.css";
import { MdShoppingBag, MdBarChart, MdGroup, MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../Context/DashContext";

const Dashboard = () => {
    const {countOrder,countUser,countProduct} = useDashboard();
    const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        
        {/* Orders Card */}
        <div className="card card-orders">
          <div className="card-content">
            <div>
              <h2>{countOrder}</h2>
              <p>Total Orders</p>
            </div>
            <MdShoppingBag className="card-icon" />
          </div>
          <div className="card-footer">
            <span className="more-info" onClick={()=>navigate("/order")}>
              More info <MdArrowForward />
            </span>
          </div>
        </div>

        {/* Products Card */}
        <div className="card card-products">
          <div className="card-content">
            <div>
              <h2>{countProduct}</h2>
              <p>Total Products</p>
            </div>
            <MdBarChart className="card-icon" />
          </div>
          <div className="card-footer">
            <span className="more-info" onClick={()=> navigate("/listproduct")}>
              More info <MdArrowForward />
            </span>
          </div>
        </div>

        {/* Users Card */}
        <div className="card card-users">
          <div className="card-content">
            <div>
              <h2>{countUser}</h2>
              <p>Total Users</p>
            </div>
            <MdGroup className="card-icon" />
          </div>
          <div className="card-footer">
            <span className="more-info" onClick={()=> navigate("/customer")}>
              More info <MdArrowForward />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
