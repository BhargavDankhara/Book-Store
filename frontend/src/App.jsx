import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import AllBooks from "./pages/AllBooks";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route path="/allbooks" element={<AllBooks />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
