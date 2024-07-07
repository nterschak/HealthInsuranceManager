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
        Task AddClaim(Claim claim);
        Task AddReimbursement(Reimbursement reimbursement);
    }
}