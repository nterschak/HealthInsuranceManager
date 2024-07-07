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
            return await _context.Members.AsNoTracking().ToListAsync();
        }

        public async Task<Member> GetById(int id)
        {
            return await _context.Members
                .Include(m => m.Claims)
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Member> GetByName(string firstName, string lastName)
        {
            return await _context.Members
                .Include(m => m.Claims)
                .FirstOrDefaultAsync(m => m.FirstName == firstName && m.LastName == lastName);
        }

        public async Task AddMember(Member member)
        {
            await _context.Members.AddAsync(member);
        }
    }
}