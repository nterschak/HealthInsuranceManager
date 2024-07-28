using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public PaymentsController(IUnitOfWork uow)
        {
            _uow = uow;
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

        [HttpDelete("payment-method/{id}")]
        public async Task<ActionResult> RemovePaymentMethod(int id)
        {
            var paymentMethod = await _uow.PaymentRepository.GetPaymentMethodById(id);
            if (paymentMethod == null) return NotFound();

            _uow.PaymentRepository.RemovePaymentMethod(paymentMethod);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem removing payment method");
        }     
    }
}