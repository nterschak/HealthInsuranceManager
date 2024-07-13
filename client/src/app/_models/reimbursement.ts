export interface Reimbursement {
    id: number
    amount: number
    dateSubmitted: Date
    dateReceived?: Date
    claimId: number
}