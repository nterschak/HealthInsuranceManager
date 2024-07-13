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
    patientId: number;
    patientName: string;
}