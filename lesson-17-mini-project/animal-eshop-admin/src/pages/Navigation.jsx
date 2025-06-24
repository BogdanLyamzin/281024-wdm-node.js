import {Routes, Route} from "react-router-dom";

import PublicRoute from "../modules/PublicRoute/PublicRoute";
import PrivateRoute from "../modules/PrivateRoute/PrivateRoute";

import LoginPage from "./LoginPage/LoginPage";
import DashboardPage from "./DashboardPage/DashboardPage";

const Navigation = ()=> {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}

export default Navigation;