import OrderProvider from "../../provider/OrderProviders";
import OrderInnerPage from "./OrderInner";

const OrderPage = () => {
    return (
        <OrderProvider>
            <OrderInnerPage/>
        </OrderProvider>
    );
}

export default OrderPage;