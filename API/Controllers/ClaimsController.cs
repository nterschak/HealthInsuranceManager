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

        [HttpGet("unpaid")]
        public async Task<List<Claim>> GetUnpaidClaims()
        {
            return await _uow.ClaimsRepository.GetUnpaidClaims();
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

            _uow.ClaimsRepository.AddClaim(newClaim);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetById), new {Id = newClaim.Id}, newClaim);

            return BadRequest("Problem adding claim.");
        }

        [HttpPost("reimbursement")]
        public async Task<ActionResult> AddReimbursement(Reimbursement reimbursement)
        {
            var claim = await _uow.ClaimsRepository.GetById(reimbursement.ClaimId);
            if (claim == null) return BadRequest("Can't add reimbursement to claim that doesn't exist");

            if (reimbursement.Amount == 0)
                return BadRequest("Amount cannot be zero.");

            _uow.ClaimsRepository.AddReimbursement(reimbursement);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetById), new {Id = reimbursement.ClaimId}, claim);

            return BadRequest("Problem adding reimbursement");
        }

        [HttpDelete("reimbursement/{id}")]
        public async Task<ActionResult> RemoveReimbursement(int id)
        {
            var reimbursement = await _uow.ClaimsRepository.GetReimbursementById(id);
            if (reimbursement == null) return NotFound();
            
            _uow.ClaimsRepository.RemoveReimbursement(reimbursement);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem removing reimbursement");
        }

        [HttpPut("reimbursement")]
        public async Task<ActionResult> UpdateReimbursement(Reimbursement updatedReimbursement)
        {
            var reimbursement = await _uow.ClaimsRepository.GetReimbursementById(updatedReimbursement.Id);
            if (reimbursement == null) return NotFound();

            if (reimbursement.DateReceived == null)
                reimbursement.DateReceived = updatedReimbursement.DateReceived;
            else
                return BadRequest("Reimbursement already marked as received");

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem updating reimbursement");
        }

        [HttpPost("payment")]
        public async Task<ActionResult> AddPayment(Payment payment)
        {
            var claim = await _uow.ClaimsRepository.GetById(payment.ClaimId);
            if (claim == null) return BadRequest("Can't add payment to claim that doesn't exist");

            var paymentMethod = await _uow.PaymentRepository.GetPaymentMethodById(payment.PaymentMethodId);
            if (paymentMethod == null) return BadRequest("Payment method does not exist");

            if (payment.Amount == 0)
                return BadRequest("Amount cannot be zero.");

            if (payment.Amount > claim.AmountOwed)
                return BadRequest("Payment amount cannot exceed amount owed for claim");

            if (payment.DatePaid < claim.DateProcessed)
                return BadRequest("Payment cannot happen before claim is processed");

            _uow.ClaimsRepository.AddPayment(payment);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetById), new {Id = payment.ClaimId}, claim);

            return BadRequest("Problem adding reimbursement");
        }        
    }
}