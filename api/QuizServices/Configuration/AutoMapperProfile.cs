using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Models;
using QuizRepository.DataModels;

namespace QuizServices.Configuration
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblUser, UserModel>()
            .ForMember(dest => dest.userImgPath, act => act.MapFrom(src => src.ImagePath))
            .ForMember(dest => dest.userImage, opt => opt.Ignore())
            .ForMember(dest => dest.Password, opt => opt.Ignore());
        }
    }
}