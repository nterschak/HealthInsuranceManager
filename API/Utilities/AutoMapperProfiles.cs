using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Member, Member>();
            CreateMap<Claim, ClaimDto>()
                .ForMember(c => c.PatientName, c => c.MapFrom(c => c.Patient.FirstName + " " + c.Patient.LastName))
                .ForMember(c => c.StatusSummary, c => c.MapFrom(c => c.GetStatusSummary()));
            CreateMap<PaymentMethod, PaymentMethod>();
        }
    }
}