import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx"
import Login from "../pages/Login/Login.jsx"; 
import Register from "../pages/Register/Register.jsx"; 
import DashabordLayout from "../layouts/DashabordLayout.jsx";
import AddProduct from "../pages/AddProduct/AddProduct.jsx";
import ManageProduct from "../pages/ManageProduct/ManageProduct.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element:  <Register></Register>
            }
        ]
    },
    {
        path: "/dashbord",
        element: <DashabordLayout></DashabordLayout>,
        children: [
            {
                index: true,
                element: <div>Dashborad home page</div>
            },
            {
                path: "add-product",
                element: <AddProduct></AddProduct>
            },
            {
                path: "manage-product",
                element: <ManageProduct></ManageProduct>
            }
        ]
    }
])
export default router;