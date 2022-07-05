import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Post } from "./pages/Post";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { Register } from "./pages/Register";
import { EditPost } from "./pages/EditPost";
import { Dashboard } from "./pages/Dashboard";
import { CreatePost } from "./pages/CreatePost";

import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if(loadingUser) {
    return <p>Carregando...</p>;
  };

  return (
    <div>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
            <div className="min-h-[60vh] mb-[2em]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
                <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
