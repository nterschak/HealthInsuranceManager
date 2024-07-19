import { Member } from "./member";
import { Payment } from "./payment";
import { Reimbursement } from "./reimbursement";

export interface Claim {
    id: number;
    claimNumber: string;
    claimType: string;
    dateVisited: Date;
    dateProcessed: Date;
    amountBilled: number;
    amountDeductible: number;
    amountOwed: number;
    networkStatus: string;
    statusSummary: string;
    patientId: number;
    patientName: string;
    patient: Member;
    reimbursements: Reimbursement[];
    payments: Payment[];
}