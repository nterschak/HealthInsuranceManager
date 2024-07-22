using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MemberRepository : IMemberRepository
    {
        private readonly DataContext _context;

        public MemberRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Member>> GetAll()
        {
            return await _context.Members
            .AsNoTracking()
            .OrderBy(m => m.DateOfBirth)
            .ToListAsync();
        }

        public async Task<Member> GetById(int id)
        {
            return await _context.Members
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Member> GetByName(string firstName, string lastName)
        {
            return await _context.Members
                .FirstOrDefaultAsync(m => m.FirstName.ToLower() == firstName.ToLower()
                    && m.LastName.ToLower() == lastName.ToLower());
        }

        public void AddMember(Member member)
        {
            _context.Members.Add(member);
        }

        public void RemoveMember(Member member)
        {
            _context.Members.Remove(member);
        }
    }
}