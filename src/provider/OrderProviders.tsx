import { useState } from "react"
import OrderContext from "../context/OrderContext";
import { Order } from "../types/Orders";

interface OrderProviderProps {
    children: React.ReactNode;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [ordersAll, setOrdersAll] = useState<Order[] | null>(null)

    return (
        <OrderContext.Provider
            value={{ordersAll, setOrdersAll}}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;