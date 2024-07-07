using API.Entities;

namespace API.Interfaces
{
    public interface IClaimsRepository
    {
        Task<List<Claim>> GetAll();
        Task<Claim> GetById(int id);
        Task<Claim> GetByClaimNumber(string claimNumber);
        Task<List<Claim>> GetForMember(int memberId);
        Task<List<Claim>> GetUnpaidClaims();
        void AddClaim(Claim claim);
        Task<Reimbursement> GetReimbursementById(int id);
        void AddReimbursement(Reimbursement reimbursement);
        void RemoveReimbursement(Reimbursement reimbursement);
        void AddPayment(Payment payment);
    }
}