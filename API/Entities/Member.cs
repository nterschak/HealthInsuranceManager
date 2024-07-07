using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Member
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        [JsonIgnore]
        public List<Claim> Claims { get; set; }
    }
}