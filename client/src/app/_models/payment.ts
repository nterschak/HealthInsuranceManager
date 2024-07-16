import { PaymentMethod } from "./payment-method"

export interface Payment {
    id: number;
    amount: number;
    datePaid: Date;
    claimId: number;
    paymentMethodId: number;
    paymentMethod?: PaymentMethod;
}