using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class PaymentMethod
    {
        public int Id { get; set; }

        [Required]
        [RegularExpression("^\\d{4}$")]
        public string LastFourDigits { get; set; }

        [Required]
        [RegularExpression("^(Bank Account|Credit Card|Debit Card)$")]
        public string PaymentType { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public List<Payment> Payments { get; set; }
    }
}