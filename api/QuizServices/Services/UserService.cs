using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using QuizRepository.DataModels;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.Common;
using QuizServices.IServices;

namespace QuizServices.Services
{
    public class UserService: BaseService<UsersListModel,TblUser> ,IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IQuestionRepository _questionRepository;
        private readonly IGenericRepository<TblUser> _genericRepository;
        public UserService(IWebHostEnvironment hostingEnvironment,IMapper mapper): base(mapper)
        {
            _userRepository = new UserRepository();
            _hostingEnvironment = hostingEnvironment;
            _questionRepository = new QuestionRepository();
            _genericRepository = new GenericRepository<TblUser>();
        }

        public UserModel Login(string email, string password)
        {
            UserModel user = new UserModel();
            var dbUser = _genericRepository.GetById(x => x.Email == email && x.IsDeleted == false,"user");
            if (dbUser.Id != 0 && PasswordHelper.IsValid(password, dbUser.Password))
            {
                user = _mapper.Map<UserModel>(dbUser);
            }
            return user;
        }

        public UserModel Register(UserModel user,string role)
        {
            //if admin then role as user and not then 2
            if (role == "2" || role == null)
            {
                user.RoleId = 2;
            }
            string imagePath = string.Empty;
            if (user.userImage != null)
            {
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(user.userImage.FileName);
                var uniqueFilePath = _hostingEnvironment.WebRootPath + "\\swagger\\Content\\Images";
                var filePath = Path.Combine(uniqueFilePath, uniqueFileName);
                 using (var stream = new FileStream(filePath, FileMode.Create))
                {
                     user.userImage.CopyToAsync(stream);
                }

                imagePath = "Content/Images/" + uniqueFileName;
            }
            if (user.Id == 0)
            {
                _userRepository.IsEmailAlreadyExist(user.Email);
                TblUser newUser = new TblUser
                {
                    Email = user.Email,
                    Password = PasswordHelper.Hash(user.Password),
                    UserName = user.UserName,
                    CreatedOn = DateTime.Now,
                    Gender = user.Gender,
                    Languageid = user.Languageid,
                    RoleId = user.RoleId,
                    ImagePath = imagePath
                };
                _userRepository.SaveUser(newUser);
            }
            else
            {
                var dbUser = _genericRepository.GetById(x => x.Id == user.Id && x.IsDeleted == false,"user");
                if (user.userImage != null)
                {
                    dbUser.ImagePath = imagePath;
                }
                dbUser.UserName = user.UserName;
                dbUser.Gender = user.Gender;
                dbUser.Email = user.Email;
                dbUser.Languageid = user.Languageid;
                dbUser.RoleId = user.RoleId;
                _userRepository.SaveUser(dbUser);
            }
           
            return user;
        }

        public override UsersListModel GetList(int currentPage, int pageSize,UsersListModel model1)
        {
            var data = _userRepository.GetUserList();
            UsersListModel model = new UsersListModel
            {
                TotalCount = data.Count,
                list = data.Skip(currentPage * pageSize).Take(pageSize).Select(user => new UserModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    CreatedOn = user.CreatedOn,
                    RoleId = user.RoleId,
                    UserScore = _questionRepository.GetUserScoreCount(user.Id)

                }).ToList()
            };
            return model;
        }

        public void DeleteUser(int id)
        {
            if (id != 0)
            {
                var user = _genericRepository.GetById(x => x.Id == id && x.IsDeleted == false,"user");
                user.IsDeleted = true;
                _userRepository.AddEditUser(user);
            }
            else
            {
                throw new Exception("try again");
            }
        }

        public UserModel GetUserById(int id)
        {
            var user = _genericRepository.GetById(x => x.Id == id && x.IsDeleted == false,"user");
            UserModel model = new UserModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                CreatedOn = user.CreatedOn,
                RoleId = user.RoleId,
                Gender = user.Gender,
                Languageid = user.Languageid,
                userImgPath = user.ImagePath

            };
            return model;

        }
    }
}
