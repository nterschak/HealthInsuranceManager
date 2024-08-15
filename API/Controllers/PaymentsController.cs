using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public PaymentsController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("payment-method")]
        public async Task<List<PaymentMethod>> GetPaymentMethods()
        {
            return await _uow.PaymentRepository.GetAllPaymentMethods();
        }

        [HttpGet("payment-method/{id}")]
        public async Task<ActionResult<PaymentMethod>> GetPaymentMethodById(int id)
        {
            var payment = await _uow.PaymentRepository.GetPaymentMethodById(id);
            if (payment == null) return NotFound();
            return payment;
        }        

        [HttpPost("payment-method")]
        public async Task<ActionResult> AddPaymentMethod(PaymentMethod newPaymentMethod)
        {
            var paymentMethod = await _uow.PaymentRepository
                .GetPaymentMethodByLastFourDigits(newPaymentMethod.LastFourDigits);

            if (paymentMethod != null) return BadRequest("Payment method already exists");

            _uow.PaymentRepository.AddPaymentMethod(newPaymentMethod);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetPaymentMethodById), new {Id = newPaymentMethod.Id}, newPaymentMethod);

            return BadRequest("Problem adding new payment method");
        }

        [HttpPut("payment-method")]
        public async Task<ActionResult> UpdatePaymentMethod(PaymentMethod updatedPaymentMethod)
        {
            var paymentMethod = await _uow.PaymentRepository.GetPaymentMethodById(updatedPaymentMethod.Id);
            if (paymentMethod == null) return NotFound();

            _mapper.Map(updatedPaymentMethod, paymentMethod);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem updating payment method");
        }

        [HttpDelete("payment-method/{id}")]
        public async Task<ActionResult> RemovePaymentMethod(int id)
        {
            var paymentMethod = await _uow.PaymentRepository.GetPaymentMethodById(id);
            if (paymentMethod == null) return NotFound();

            _uow.PaymentRepository.RemovePaymentMethod(paymentMethod);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem removing payment method");
        }     

        [HttpGet("payment-rule")]
        public async Task<List<PaymentRule>> GetPaymentRules()
        {
            return await _uow.PaymentRepository.GetAllPaymentRules();
        }

        [HttpGet("payment-rule/{id}")]
        public async Task<ActionResult<PaymentRule>> GetPaymentRuleById(int id)
        {
            var rule = await _uow.PaymentRepository.GetPaymentRuleById(id);
            if (rule == null) return NotFound();
            return rule;
        }           

        [HttpPost("payment-rule")]
        public async Task<ActionResult> AddPaymentRule(PaymentRule newPaymentRule)
        {
            var paymentMethod = await _uow.PaymentRepository.GetPaymentMethodById(newPaymentRule.PaymentMethodId);

            if (paymentMethod == null) return BadRequest("Payment method does not exist.");

            _uow.PaymentRepository.AddPaymentRule(newPaymentRule);

            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetPaymentRuleById), new {Id = newPaymentRule.Id}, newPaymentRule);

            return BadRequest("Problem adding new payment rule.");
        }

        [HttpDelete("payment-rule/{id}")]
        public async Task<ActionResult> RemovePaymentRule(int id)
        {
            var paymentRule = await _uow.PaymentRepository.GetPaymentRuleById(id);
            if (paymentRule == null) return NotFound();

            _uow.PaymentRepository.RemovePaymentRule(paymentRule);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem removing payment rule");
        }             
    }
}