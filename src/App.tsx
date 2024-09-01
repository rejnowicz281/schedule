import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SettingsPage from "./pages/settings";
import { AuthProvider, useAuth } from "./providers/auth-provider";

export default function App() {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <AuthProvider>
                <Router />
            </AuthProvider>
        </div>
    );
}

function Router() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {user ? (
                    <>
                        <Route path="/*" element={<Navigate to="/" />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </>
                ) : (
                    <>
                        <Route path="/*" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
