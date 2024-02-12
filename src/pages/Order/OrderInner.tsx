import { useContext, useEffect, useState } from 'react';
import OrderTabsHeader from './OrderTabsHeader';
import { OrderStatus, OrderStatusType } from '../../types/OrderStatus';
import useFetch from '../../services/hooks/useFetch';
import OrderTabsContent from './OrderTabsContent';
import { Order } from '../../types/Orders';
import LocaleContext, { LocaleContextType } from '../../context/LocaleContext';
import Loading from '../../components/Loading';
import CustomSuspense from '../../components/CustomSuspense';
import OrderContext, { OrderContextType } from '../../context/OrderContext';

import './style.scss';

const OrderInnerPage = () => {
    const {ordersAll, setOrdersAll} = useContext(OrderContext) as OrderContextType
    const [orderStatuses, setOrderStatuses] = useState<OrderStatus | null>(null)
    const [activeStatus, setActiveStatus] = useState<OrderStatusType | null>(null)
    const { locale } = useContext(LocaleContext) as LocaleContextType
    const {data: orderStatusesData, getData: getStatusData, isLoading: isStatusLoading } = useFetch<OrderStatus>()
    const {data: ordersData, getData: getOrdersData, isLoading: isOrdersLoading} = useFetch<Order[]>()

    useEffect(() => {
        if (orderStatusesData) {
            setOrderStatuses(orderStatusesData)
        }
    }, [orderStatusesData])

    useEffect(() => {
        if (ordersData) {
            setOrdersAll(ordersData)
        }
    }, [ordersData])

    useEffect(() => {
        getStatusData('orderStatus')
        getOrdersData('orders')
    }, [])

    return (
        <section className="order container">
            <CustomSuspense
                trigger={!isStatusLoading && !isOrdersLoading}
                fallback={<Loading />}
            >
                {
                    orderStatuses &&
                    <OrderTabsHeader
                        orderStatuses={orderStatuses}
                        activeStatus={activeStatus}
                        setActiveStatus={setActiveStatus}
                        locale={locale}
                    />
                }
                {
                    ordersAll &&
                    <OrderTabsContent
                        ordersAll={ordersAll}
                        orderStatuses={orderStatuses}
                        activeStatus={activeStatus}
                        // activeStatusVariations={activeStatusVariations}
                        locale={locale}
                    />
                }
            </CustomSuspense>
        </section>
    );
}

export default OrderInnerPage;