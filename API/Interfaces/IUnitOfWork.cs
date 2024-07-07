namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IMemberRepository MemberRepository { get; }
        IClaimsRepository ClaimsRepository { get; }
        IPaymentRepository PaymentRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}