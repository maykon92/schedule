import "./App.css";

//React 
import { useState } from "react";

// Hooks
import { useAuth } from "./hooks/useAuth";

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";
import Search from "./pages/Search/Search";
import Countries from "./pages/Countries/Countries";
import Folder from "./pages/Folder/Folder";
import Resume from "./pages/Folder/Resume";
import Italiancitizenship from "./pages/Folder/Italiancitizenship";
import Documents from "./pages/Folder/Documents";
import DirectoryFolder from "./pages/DirectoryFolder/DirectoryFolder";

function App() {
  const { auth, loading } = useAuth();
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteChange = (title) => {
    setSelectedRoute(title);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar selectedRoute={selectedRoute} />
        <Menu onRouteChange={handleRouteChange} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route 
              path="/countries" 
              element={auth ? <Countries /> : <Countries to="/login" />}
            />
            <Route 
              path="/folder/*"
              element={<Folder />}
            >
              <Route path="resume" element={<Resume />} />
              <Route path="italiancitizenship" element={<Italiancitizenship />} />
              <Route path="documents" element={<Documents />} />
            </Route>
            <Route 
              path="/directoryfolder/:id"
              element={<DirectoryFolder />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route path="photos/:id" element={<Photo />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
