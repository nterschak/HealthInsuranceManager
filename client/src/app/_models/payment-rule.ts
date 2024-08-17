import { PaymentMethod } from "./payment-method";

export interface PaymentRule {
    id: number;
    description: string;
    percentage: number;
    paymentMethodId: number;
    paymentMethod?: PaymentMethod;
}