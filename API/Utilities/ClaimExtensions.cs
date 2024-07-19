using API.DTOs;
using API.Entities;

namespace API.Utilities
{
    public static class ClaimExtensions
    {
        public static string GetStatusSummary(this Claim claim)
        {
            string defaultResult = "";
            if (claim != null)
            {
                if (claim.AmountOwed <= 0) return "No action";

                if (claim.Reimbursements != null)
                {
                    if (claim.Reimbursements?.Count == 0) return "Processed";

                    if (claim.Reimbursements.Any(r => r.DateReceived == null))
                        return "Waiting for reimbursement";
                }
                else return defaultResult;

                if (claim.Payments != null)
                {
                    if (claim.Payments.Sum(p => p.Amount) < claim.AmountOwed)
                        return "Payment due";
                }
                else return defaultResult;

                return "Completed";
            }
            else return defaultResult;
        }

        public static ClaimDto RemoveNaviationProperties(this ClaimDto claim)
        {
            claim.Patient = null;
            claim.Reimbursements = null;
            claim.Payments = null;
            return claim;
        }
    }
}