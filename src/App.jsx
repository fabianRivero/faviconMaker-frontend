import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Home from './components/Home/Home.jsx';
import Editor from './components/Editor/Editor.jsx';
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import History from './components/History/History.jsx';
import Help from './components/Help/Help.jsx';
import SidebarLayout from "./components/layouts/SidebarLayout.jsx";
import EditorLayout from "./components/layouts/EditorLayout.jsx"; 

function AuthRedirect() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSignedIn && location.pathname === "/") {
      navigate("/editor");
    }
  }, [isSignedIn, navigate, location.pathname]);

  return null;
}

const ProtectedRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut><Home /></SignedOut>
  </>
);

function App() {
  return (
    <>
      <AuthRedirect/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/editor" element={
            <ProtectedRoute>
              <SidebarLayout>
                <EditorLayout>
                  {(layoutProps) => (
                    <Editor {...layoutProps} />
                  )}
                </EditorLayout>
              </SidebarLayout>
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <SidebarLayout>
                <History />
              </SidebarLayout>
            </ProtectedRoute>
          } />

          <Route path="/help" element={
            <ProtectedRoute>
              <SidebarLayout>
                <Help />
              </SidebarLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;