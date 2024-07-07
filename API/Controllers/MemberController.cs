using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public MemberController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<List<Member>> GetMembers()
        {
            return await _uow.MemberRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMemberById(int id)
        {
            var member = await _uow.MemberRepository.GetById(id);
            if (member == null) return NotFound();
            return member;
        }

        [HttpPost]
        public async Task<ActionResult> AddMember(Member member)
        {
            if (await _uow.MemberRepository.GetByName(member.FirstName, member.LastName) != null)
                return BadRequest("Member by same name already exists");

            await _uow.MemberRepository.AddMember(member);
            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetMemberById), new {Id = member.Id}, member);

            return BadRequest("Problem adding new member");
        }
    }
}