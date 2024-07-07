using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Reimbursement
    {
        public int Id { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        public DateOnly DateSubmitted { get; set; }

        public DateOnly DateReceived { get; set; }

        [Required]
        public int ClaimId { get; set; }

        [JsonIgnore]
        public Claim Claim { get; set; } = null!;
    }
}