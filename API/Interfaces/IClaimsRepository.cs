using API.DTOs;
using API.Entities;
using API.FilterParams;

namespace API.Interfaces
{
    public interface IClaimsRepository
    {
        Task<List<ClaimDto>> GetAll(ClaimParams claimParams);
        Task<ClaimDto> GetById(int id);
        Task<ClaimDto> GetByClaimNumber(string claimNumber);
        void AddClaim(Claim claim);
        Task<Reimbursement> GetReimbursementById(int id);
        void AddReimbursement(Reimbursement reimbursement);
        void RemoveReimbursement(Reimbursement reimbursement);
        void AddPayment(Payment payment);
    }
}