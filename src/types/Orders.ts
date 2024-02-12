export interface Order {
    "orderId": number;
    "date": string;
    "productItems": OrderProduct[];
    "status": string;
    "displayedStatusName"?: string;
    "totalPrice": string;
}

export interface OrderProduct {
    "pid": number;
    "productName": string;
    "quantity": number;
    "price": number;
    "totalPrice": number;
}
