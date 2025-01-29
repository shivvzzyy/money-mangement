import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./context/userContext";
import Home from "./views/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import ExpenseTrack from "./views/ExpenseTrack";
import BudgetPlanner from "./views/BudgetPlanner";
import About from "./views/About";
import Contact from "./views/Contact";
import Reports from "./views/Reports";
import Settings from "./views/Settings";

const App = () => {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/auth/login" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/dashboard"
          element={!user ? <Navigate to="/auth/login" /> : <Dashboard />}
        />
        <Route
          path="admin/track-expense"
          element={!user ? <Navigate to="/auth/login" /> : <ExpenseTrack />}
        />
        <Route
          path="admin/reports"
          element={!user ? <Navigate to="/auth/login" /> : <Reports />}
        />
        <Route
          path="admin/settings"
          element={!user ? <Navigate to="/auth/login" /> : <Settings />}
        />
        <Route
          path="admin/make-budget"
          element={!user ? <Navigate to="/auth/login" /> : <BudgetPlanner />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
