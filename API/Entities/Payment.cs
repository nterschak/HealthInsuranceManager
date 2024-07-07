using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Payment
    {
        public int Id { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        public DateOnly DatePaid { get; set; }

        public int ClaimId { get; set; }

        [JsonIgnore]
        public Claim Claim { get; set; }

        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}