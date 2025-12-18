import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx"
import Login from "../pages/Login/Login.jsx"; 
import Register from "../pages/Register/Register.jsx"; 
import DashabordLayout from "../layouts/DashabordLayout.jsx";
import ManageProduct from "../pages/ManageProduct/ManageProduct.jsx";
import AddRequest from "../pages/AddRequest/AddRequest.jsx";
import PrivateRoutes from "../provider/PrivateRoutes.jsx";
import AllUsers from "../pages/AllUsers/AllUsers.jsx";


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
        element: <PrivateRoutes><DashabordLayout></DashabordLayout></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <div>Dashborad home page</div>
            },
            {
                path: "profile",
                element: <div>My Profile page</div>
            },
            {
                path: "create-donation-request",
                element: <AddRequest></AddRequest>
            },
            {
                path: "all-users",
                element: <AllUsers></AllUsers>
            },
            {
                path: "my-donation-requests",
                element: <div>My Donation Request page</div>
            },
            {
                path: "manage-product",
                element: <ManageProduct></ManageProduct>
            }
        ]
    }
])
export default router;