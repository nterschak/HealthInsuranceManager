namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IMemberRepository MemberRepository { get; }
        IClaimsRepository ClaimsRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}