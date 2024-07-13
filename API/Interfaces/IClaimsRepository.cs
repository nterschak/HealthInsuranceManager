using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IClaimsRepository
    {
        Task<List<ClaimDto>> GetAll();
        Task<ClaimDto> GetById(int id);
        Task<ClaimDto> GetByClaimNumber(string claimNumber);
        Task<List<ClaimDto>> GetForMember(int memberId);
        Task<List<ClaimDto>> GetUnpaidClaims();
        void AddClaim(Claim claim);
        Task<Reimbursement> GetReimbursementById(int id);
        void AddReimbursement(Reimbursement reimbursement);
        void RemoveReimbursement(Reimbursement reimbursement);
        void AddPayment(Payment payment);
    }
}