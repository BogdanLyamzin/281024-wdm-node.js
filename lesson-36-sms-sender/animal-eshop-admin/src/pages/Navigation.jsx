import {Routes, Route} from "react-router-dom";

import PublicRoute from "../modules/PublicRoute/PublicRoute";
import PrivateRoute from "../modules/PrivateRoute/PrivateRoute";

import LoginPage from "./LoginPage/LoginPage";
import DashboardPage from "./DashboardPage/DashboardPage";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import ProductsPage from "./ProductsPage/ProductsPage";
import OrdersPage from "./OrdersPage/OrdersPage";
import CustomersPage from "./CustomersPage/CustomersPage";
import AdminsPage from "./AdminsPage/AdminsPage";

const Navigation = ()=> {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/admins" element={<AdminsPage />} />
            </Route>
        </Routes>
    )
}

export default Navigation;