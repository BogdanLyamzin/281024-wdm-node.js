import {Routes, Route} from "react-router-dom";

import LoginPage from "./LoginPage/LoginPage";
import DashboardPage from "./DashboardPage/DashboardPage";

const Navigation = ()=> {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    )
}

export default Navigation;