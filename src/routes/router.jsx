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
import MyRequest from "../pages/MyRequest/MyRequest.jsx";
import Donate from "../pages/Donate/Donate.jsx";
import PeymentSuccess from "../pages/PaymentSuccess/PeymentSuccess.jsx";
import SearchRequest from "../pages/SearchRequest/SearchRequest.jsx";
import NotFound from "../components/FotFound.jsx";
import AllRequest from "../pages/AllRequest/AllRequest.jsx";
import ViewDetails from "../pages/ViewDetails/ViewDetails.jsx";


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
            },
            {
                path: "/donate",
                element: <PrivateRoutes><Donate></Donate></PrivateRoutes>
            },
            {
                path: "/payment-success",
                element: <PeymentSuccess></PeymentSuccess>
            },
            {
                path: "/search",
                element: <SearchRequest></SearchRequest>
            },
            {
                path: "/all-request",
                element: <AllRequest></AllRequest>
            },
            {
                path: "/view-details/:id",
                element: <ViewDetails></ViewDetails>
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
                element: <MyRequest></MyRequest>
            },
            {
                path: "manage-product",
                element: <ManageProduct></ManageProduct>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
])
export default router;