using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ClaimsRepository : IClaimsRepository
    {
        private readonly DataContext _context;

        public ClaimsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Claim>> GetAll()
        {
            return await _context.Claims.AsNoTracking().ToListAsync();
        }

        public async Task<Claim> GetById(int id)
        {
            return await _context.Claims
                .Include(c => c.Patient)
                .SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Claim> GetByClaimNumber(string claimNumber)
        {
            return await _context.Claims
                .Include(c => c.Patient)
                .SingleOrDefaultAsync(c => c.ClaimNumber == claimNumber);
        }

        public async Task<List<Claim>> GetForMember(int memberId)
        {
            return await _context.Claims
                .AsNoTracking()
                .Where(c => c.PatientId == memberId)
                .ToListAsync();
        }

        public async Task<List<Claim>> GetUnpaidClaims()
        {
           throw new NotImplementedException();
        }

        public async Task AddClaim(Claim claim)
        {
            await _context.Claims.AddAsync(claim);
        }

        public async Task AddReimbursement(Reimbursement reimbursement)
        {
            await _context.Reimbursements.AddAsync(reimbursement);
        }
    }
}