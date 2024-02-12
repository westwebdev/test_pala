import { OrderProduct } from "../../types/Orders";

import './style.scss';

const OrderCardProduct = ({pid, quantity, productName, price, totalPrice}: OrderProduct) => {
    return (
        <table className="order-product" product-id={pid}>
            <tbody>
                <tr>
                    <td className="order-product__quantity">{quantity} x</td>
                    <td className="order-product__name">{productName}</td>
                    <td className="order-product__price">{price}</td>
                    <td className="order-product__total">{totalPrice}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrderCardProduct;
