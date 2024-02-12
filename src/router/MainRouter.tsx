import { Route, Routes } from "react-router-dom";
import OrderPage from "../pages/Order";
import HomePage from '../pages/Home';

const MainRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/orders" element={<OrderPage />} />
        </Routes>
    );
}

export default MainRoute;
