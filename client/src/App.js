import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/authentication/register";
import Login from "./pages/authentication/login";
import PrivateRoutes from "./components/Routes/Private";
import ForgotPassword from "./pages/authentication/forgot_password";
import AdminRoutes from "./components/Routes/Admin";
import AdminDashboard from "./pages/admin/admin_dashboard";
import CreateCategory from "./pages/admin/create_category";
import CreateProduct from "./pages/admin/create_product";
import Users from "./pages/admin/users";
import UserDashboard from "./pages/user/user_dashboard";
import Profile from "./pages/user/profile";
import Orders from "./pages/user/orders";
import GetAllProducts from "./pages/admin/get_all_products";
import UpdateProduct from "./pages/admin/update_product";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AllCategories from "./pages/AllCategories";
import CategoryResults from "./pages/CategoryResultsPage";
import AllOrders from "./pages/admin/all_orders";
import OrderDetails from "./pages/user/order_details";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/categories" element={<AllCategories />} />
                <Route path="/category/:slug" element={<CategoryResults />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/dashboard" element={<PrivateRoutes/>}>
                    <Route path="user" element={<UserDashboard/>}/>
                    <Route path="user/profile" element={<Profile/>}/>
                    <Route path="user/orders" element={<Orders/>}/>
                    <Route path="user/orders/:id" element={<OrderDetails/>}/>
                </Route>
                <Route path="/dashboard" element={<AdminRoutes/>}>
                    <Route path="admin" element={<AdminDashboard/>}/>
                    <Route path="admin/profile" element={<Profile/>}/>
                    <Route path="admin/create-category" element={<CreateCategory/>}/>
                    <Route path="admin/create-product" element={<CreateProduct/>}/>
                    <Route path="admin/product/:slug" element={<UpdateProduct />} />
                    <Route path="admin/products" element={<GetAllProducts/>}/>
                    <Route path="admin/users" element={<Users/>}/>
                    <Route path="admin/orders" element={<AllOrders />} />
                </Route>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/policy" element={<Policy/>}/>
                <Route path="*" element={<Pagenotfound/>}/>
            </Routes>

        </>
    );
}

export default App;
