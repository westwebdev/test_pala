import { useEffect, useMemo, useState } from "react";
import { OrderStatus, OrderStatusType } from "../../../types/OrderStatus";
import { Order } from "../../../types/Orders";
import OrderProductCard from "../../../components/OrderCard";
import { Locales } from "../../../types/LocaleType";

import './style.scss';

interface PropsType {
    ordersAll: Order[] | null;
    orderStatuses: OrderStatus | null;
    activeStatus: OrderStatusType | null;
    locale: Locales;
}

type FilteredOrders = {
    [key in OrderStatusType]: Order[]
}

const OrderTabsContent = ({ordersAll, orderStatuses, activeStatus, locale } : PropsType) => {
    const [orders, setOrders] = useState<Order[] | null>(null)

    const filteredOrders: FilteredOrders = useMemo(() => {
        const filteredOrdersObj = {} as FilteredOrders;

        if (ordersAll?.length && orderStatuses) {
            const orderStatusKeysArray: OrderStatusType[] = Object.keys(orderStatuses) as OrderStatusType[];

            ordersAll.forEach((order) => {
                const statusKind = orderStatusKeysArray.find((key) => {
                    const objKey = key as keyof typeof orderStatuses;

                    return orderStatuses[objKey].variation.some((variation) => {
                        order.displayedStatusName = variation.displayName[locale]
                        return variation.id === order.status
                    })
                })

                if(statusKind) {
                    if (!filteredOrdersObj[statusKind]) {
                        filteredOrdersObj[statusKind] = [];
                    }
                    filteredOrdersObj[statusKind].push(order)
                }
            })

        }

        return filteredOrdersObj

    }, [ordersAll, orderStatuses, locale])

    useEffect(() => {
        if(activeStatus) {
            setOrders(filteredOrders[activeStatus])
        }
    }, [activeStatus, filteredOrders])

    return (
        <div className="order-content">
            {
                orders && orders.map((order) => (
                    <OrderProductCard
                        key={order.orderId}
                        order={order}
                    />
                ))
            }
        </div>
    );
}

export default OrderTabsContent;
