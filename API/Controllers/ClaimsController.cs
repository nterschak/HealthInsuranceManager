using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClaimsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ClaimsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<List<Claim>> GetAllClaims()
        {
            return await _uow.ClaimsRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Claim>> GetById(int id)
        {
            var claim = await _uow.ClaimsRepository.GetById(id);
            if (claim == null) return NotFound();
            return claim;
        }

        [HttpGet("claim-number/{claimNumber}")]
        public async Task<ActionResult<Claim>> GetByClaimNumber(string claimNumber)
        {
            var claim = await _uow.ClaimsRepository.GetByClaimNumber(claimNumber);
            if (claim == null) return NotFound();
            return claim;            
        }

        [HttpPost]
        public async Task<ActionResult> AddClaim(Claim newClaim)
        {
            var claim = await _uow.ClaimsRepository.GetByClaimNumber(newClaim.ClaimNumber);
            if (claim != null) return BadRequest("This claim has already been added.");
            
            var member = await _uow.MemberRepository.GetById(newClaim.PatientId);
            if (member == null) return BadRequest("Patient does not exist as member in application");

            await _uow.ClaimsRepository.AddClaim(newClaim);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetById), new {Id = newClaim.Id}, newClaim);

            return BadRequest("Problem adding claim.");
        }

        [HttpPost("add-reimbursement")]
        public async Task<ActionResult> AddReimbursement(Reimbursement reimbursement)
        {
            var claim = await _uow.ClaimsRepository.GetById(reimbursement.ClaimId);
            if (claim == null) return BadRequest("Can't add reimbursement to claim that doesn't exist");

            await _uow.ClaimsRepository.AddReimbursement(reimbursement);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetById), new {Id = reimbursement.ClaimId}, claim);

            return BadRequest("Problem adding reimbursement");
        }
    }
}