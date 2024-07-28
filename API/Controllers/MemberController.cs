using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public MemberController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
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

        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<Member>> GetMemberByName(string name)
        {
            string[] names = name.Split();
            if (names.Length != 2) return BadRequest("Name must be two words (first and last)");
            var member = await _uow.MemberRepository.GetByName(names[0], names[1]);
            if (member == null) return NotFound();
            return member;
        }

        [HttpPost]
        public async Task<ActionResult> AddMember(Member member)
        {
            if (await _uow.MemberRepository.GetByName(member.FirstName, member.LastName) != null)
                return BadRequest("Member by same name already exists");

            _uow.MemberRepository.AddMember(member);
            if (await _uow.Complete())
                return CreatedAtAction(nameof(GetMemberById), new {Id = member.Id}, member);

            return BadRequest("Problem adding new member");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(Member updatedMember)
        {
            var member = await _uow.MemberRepository.GetById(updatedMember.Id);
            if (member == null) return NotFound();

            _mapper.Map(updatedMember, member);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem updating member");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveMember(int id)
        {
            var member = await _uow.MemberRepository.GetById(id);
            if (member == null) return NotFound();

            _uow.MemberRepository.RemoveMember(member);

            if (await _uow.Complete()) return NoContent();

            return BadRequest("Problem deleting member");
        }
    }
}