import { useContext, useEffect } from "react";
import useFetch from "../../services/hooks/useFetch";
import { Order, OrderProduct } from "../../types/Orders";
import OrderCardProduct from "../OrderCardProduct";
import OrderContext, { OrderContextType } from "../../context/OrderContext";

import './style.scss'

interface PropsType {
    order: Order
}

const OrderProductCard = ({ order }: PropsType) => {
    const {setOrdersAll} = useContext(OrderContext) as OrderContextType
    const {updateData,isLoading,isError} = useFetch<Order>()
    const {data,getData} = useFetch<Order[]>()

    useEffect(() => {
        if (!isLoading && !isError) {
            getData('orders');
        }
    }, [isLoading, isError])

    useEffect(() => {
        if (data) {
            setOrdersAll(data)
        }
    }, [data])

    const statusHandler = (order: Order) => {
        order.status = "canceled_by_customer";
        updateData('orders', order)
    }

    const isCancelBtnShow = () => {
        const notAllowedStatuses = ["confirmed", "completed", "canceled_by_customer", "rejected", "expired", "failed"];

        return !notAllowedStatuses.includes(order.status) && !isError
    }

    return (
        <div className="order-card">
            <div className="order-card__header order-card__block">
                <div className="order-card__id order-card__row">{order?.orderId}</div>
            </div>
            <div className="order-card__body order-card__block">
                <div className="order-card__date order-card__row">{order?.date}</div>
                <div className="order-card__product order-card__row">
                    {
                        order?.productItems && order?.productItems.map(({pid, productName, quantity, price, totalPrice}: OrderProduct) => (
                            <OrderCardProduct
                                key={pid}
                                pid={pid}
                                quantity={quantity}
                                productName={productName}
                                price={price}
                                totalPrice={totalPrice}
                            />
                        ))
                    }
                </div>
                <div className="order-card__total order-card__row">
                    <span>Total</span> <span>{order?.totalPrice}</span>
                    </div>
            </div>
            <div className="order-card__footer order-card__block">
                {
                    isCancelBtnShow() && (
                        <button onClick={() => statusHandler(order)} className="order-card__button">X Cancel</button>
                    )
                }
                <div className="order-card__status order-card__row">{order?.displayedStatusName || order?.status}</div>
            </div>
        </div>
    );
}

export default OrderProductCard;