import ChatBot from "../../components/ChatBot";
import Admin from "../../Layout/Admin";

const Component = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Budget Planner ChatBot</h1>
      <ChatBot />
    </div>
  );
};

const BudgetPlanner = () => {
  return (
    <Admin>
      <Component />
    </Admin>
  );
};

export default BudgetPlanner;
