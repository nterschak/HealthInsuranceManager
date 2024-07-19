namespace API.Entities
{
    public class Claim
    {
        public int Id { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimType { get; set; }
        public string VisitedProvider { get; set; }
        public DateOnly DateVisited { get; set; }
        public DateOnly DateProcessed { get; set; }
        public decimal AmountBilled { get; set; }
        public decimal AmountDeductible { get; set; }
        public decimal AmountPlanPaid { get; set; }
        public decimal AmountPlanDiscount { get; set; }
        public decimal AmountYourResponsibility { get; set; }
        public decimal AmountPaidAtVisit { get; set; }
        public decimal AmountOwed { get; set; }
        public string NetworkStatus { get; set; }
        public int PatientId { get; set; }
        public Member Patient { get; set; }
        public List<Reimbursement> Reimbursements { get; set; }
        public List<Payment> Payments { get; set; }
    }
}