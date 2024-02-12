export type OrderStatusType = "pending" | "completed" | "special";

export interface OrderStatus {
    pending: OrderStatusKind
    completed: OrderStatusKind
    special: OrderStatusKind
}

export interface OrderStatusKind {
    displayName: OrderStatusDisplayName;
    variation: OrderStatusVariation[];
}

export interface OrderStatusVariation {
    id: string;
    displayName: OrderStatusDisplayName;
}

export interface OrderStatusDisplayName {
    en: string;
    sk: string;
}
