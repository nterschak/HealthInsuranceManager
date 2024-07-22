import { Member } from "./member";
import { Payment } from "./payment";
import { Reimbursement } from "./reimbursement";

export interface Claim {
    id: number;
    claimNumber: string;
    claimType: string;
    visitedProvider: string;
    dateVisited: string;
    dateProcessed: string;
    amountBilled: number;
    amountDeductible: number;
    amountPlanPaid: number;
    amountPlanDiscount: number;
    amountYourResponsibility: number;
    amountPaidAtVisit: number;
    amountOwed: number;
    networkStatus: string;
    statusSummary: string;
    patientId: number;
    patientName: string;
    patient?: Member;
    reimbursements?: Reimbursement[];
    payments?: Payment[];
}