import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrderStatus, OrderStatusType } from "../../../types/OrderStatus";
import { Locales } from "../../../types/LocaleType";

import './style.scss';

interface OrderType {
    id: string;
    displayName: string;
}

interface PropsType {
    orderStatuses: OrderStatus | null;
    activeStatus: string | null;
    setActiveStatus: Dispatch<SetStateAction<OrderStatusType | null>>;
    locale: Locales;
}

const OrderTabsHeader = ({ orderStatuses, activeStatus, setActiveStatus, locale} : PropsType) => {
    const [orderTypes, setOrderTypes] = useState<OrderType[] | null>(null)

    useEffect(() => {
        if (orderStatuses) {
            const types = Object.keys(orderStatuses).map((key) => {
                const objKey = key as keyof typeof orderStatuses;

                return ({
                    id: key,
                    displayName: orderStatuses[objKey].displayName[locale]
                })
            }, [] as OrderType[])

            setOrderTypes(types)
        }
    }, [orderStatuses, locale])

    useEffect(() => {
        if (orderTypes?.length) {
            setActiveStatus(orderTypes[0].id as OrderStatusType)
        }
    },[orderTypes])

    const activeStateHandle = (orderType: OrderType) => {
        setActiveStatus(orderType.id as OrderStatusType)
    }

    return (
        <div className="order-nav">
            {
                orderTypes && orderTypes.map((orderType) => (
                    <button
                        key={orderType.id}
                        type="button"
                        onClick={() => activeStateHandle(orderType)}
                        className={`order-nav__btn ${activeStatus === orderType.id && 'active'}`}
                    >
                        {orderType.displayName}
                    </button>
                ))
            }
        </div>
    );
}

export default OrderTabsHeader;
