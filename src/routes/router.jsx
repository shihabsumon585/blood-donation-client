import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx"
import Login from "../pages/Login/Login.jsx"; 
import Register from "../pages/Register/Register.jsx"; 
import DashabordLayout from "../layouts/DashabordLayout.jsx";
import ManageProduct from "../pages/ManageProduct/ManageProduct.jsx";
import AddRequest from "../pages/AddRequest/AddRequest.jsx";


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
                path: "create-donation-request",
                element: <AddRequest></AddRequest>
            },
            {
                path: "manage-product",
                element: <ManageProduct></ManageProduct>
            }
        ]
    }
])
export default router;