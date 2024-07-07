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
                .Include(c => c.Reimbursements)
                .Include(c => c.Payments).ThenInclude(p => p.PaymentMethod)
                .SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Claim> GetByClaimNumber(string claimNumber)
        {
            return await _context.Claims
                .Include(c => c.Patient)
                .Include(c => c.Reimbursements)
                .Include(c => c.Payments).ThenInclude(p => p.PaymentMethod)           
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
           var claims = await _context.Claims
              .Include(c => c.Payments)
              .ToListAsync();

            return claims.Where(c => c.Payments.Sum(p => p.Amount) < c.AmountOwed).ToList();
        }

        public void AddClaim(Claim claim)
        {
            _context.Claims.Add(claim);
        }

        public async Task<Reimbursement> GetReimbursementById(int id)
        {
            return await _context.Reimbursements.FindAsync(id);
        }

        public void AddReimbursement(Reimbursement reimbursement)
        {
            _context.Reimbursements.Add(reimbursement);
        }

        public void RemoveReimbursement(Reimbursement reimbursement)
        {
            _context.Remove(reimbursement);
        }         

        public void AddPayment(Payment payment)
        {
            _context.Payments.Add(payment);
        }
    }
}