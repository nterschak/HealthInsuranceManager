namespace API.FilterParams
{
    public class ClaimParams
    {
        public int Year { get; set; }
        public bool UnpaidOnly { get; set; } = true;
        public int PatientId { get; set; }
    }
}