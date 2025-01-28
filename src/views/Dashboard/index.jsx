import React from "react";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import CardLineChart from "../../components/Cards/CardLineChart";
import Admin from "../../Layout/Admin";
import { useUser } from "../../context/userContext";

function Component() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardLineChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
}

const Dashboard = () => {
  return (
    <Admin>
      <Component />
    </Admin>
  );
};

export default Dashboard;
