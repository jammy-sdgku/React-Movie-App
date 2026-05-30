import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
