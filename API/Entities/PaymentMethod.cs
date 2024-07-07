using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class PaymentMethod
    {
        public int Id { get; set; }

        [RegularExpression("^\\d{4}$")]
        public string LastFourDigits { get; set; }

        [RegularExpression("^(Bank Account|Credit Card|Debit Card)$")]
        public string PaymentType { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public List<Payment> Payments { get; set; }
    }
}