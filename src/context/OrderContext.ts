import { Dispatch, SetStateAction, createContext } from "react";
import { Order } from "../types/Orders";

export interface OrderContextType {
    ordersAll: Order[] | null;
    setOrdersAll: Dispatch<SetStateAction<Order[] | null>>
}

const OrderContext = createContext<OrderContextType | null>(null);

export default OrderContext;
