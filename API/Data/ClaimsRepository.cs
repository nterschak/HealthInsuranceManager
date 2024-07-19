using API.DTOs;
using API.Entities;
using API.FilterParams;
using API.Interfaces;
using API.Utilities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ClaimsRepository : IClaimsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ClaimsRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ClaimDto>> Get(ClaimParams claimParams)
        {
            var claims = await _context.Claims
                .AsNoTracking()
                .Include(c => c.Patient)
                .Include(c => c.Reimbursements)
                .Include(c => c.Payments)
                .Where(c => c.DateVisited.Year == claimParams.Year)
                .Where(c => claimParams.PatientId == 0 || c.PatientId == claimParams.PatientId)
                .OrderByDescending(c => c.DateProcessed)
                .ToListAsync();
            
            if (claimParams.UnpaidOnly)
            {
                claims = claims
                    .Where(c => c.Payments.Sum(p => p.Amount) < c.AmountOwed)
                    .ToList();
            }

            return claims
                .Select(c => _mapper.Map<ClaimDto>(c))
                .Select(c => c.RemoveNaviationProperties())
                .ToList();
        }

        public async Task<ClaimDto> GetById(int id)
        {
            var claim = await _context.Claims
                .Include(c => c.Patient)
                .Include(c => c.Reimbursements)
                .Include(c => c.Payments).ThenInclude(p => p.PaymentMethod)
                .SingleOrDefaultAsync(c => c.Id == id);
            return _mapper.Map<ClaimDto>(claim);
        }

        public async Task<ClaimDto> GetByClaimNumber(string claimNumber)
        {
            var claim = await _context.Claims
                .Include(c => c.Patient)
                .Include(c => c.Reimbursements)
                .Include(c => c.Payments).ThenInclude(p => p.PaymentMethod)           
                .SingleOrDefaultAsync(c => c.ClaimNumber == claimNumber);
            return _mapper.Map<ClaimDto>(claim);
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