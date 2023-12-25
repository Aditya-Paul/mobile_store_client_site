import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Collection from "../Page/Collection/Collection";
import Carts from "../Page/Carts/Carts";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // errorElement:,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/collection",
                element: <Collection></Collection>
            },
            {
                path: "/carts",
                element: <Carts></Carts>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
]);
export default router;