export interface Reimbursement {
    id: number
    amount: number
    dateSubmitted: string
    dateReceived?: string
    claimId: number
}