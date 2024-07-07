using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        Task<List<Member>> GetAll();
        Task<Member> GetById(int id);
        Task<Member> GetByName(string firstName, string lastName);
        void AddMember(Member member);      
    }
}