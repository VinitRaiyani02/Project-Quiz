using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public UserService(IWebHostEnvironment hostingEnvironment)
        {
            _userRepository = new UserRepository();
            _hostingEnvironment = hostingEnvironment;
        }

        public UserModel Login(string email, string password)
        {
            UserModel user = new UserModel();
            var dbUser = _userRepository.GetUser(email);
            if (dbUser.Id != 0 && PasswordHelper.IsValid(password, dbUser.Password))
            {
                user.Email = dbUser.Email;
                user.Id = dbUser.Id;
                user.UserName = dbUser.UserName;
                user.Password = dbUser.Password;
                user.CreatedOn = dbUser.CreatedOn;
                user.Gender = dbUser.Gender;
                user.IsDeleted = dbUser.IsDeleted;
                user.Languageid = dbUser.Languageid;
                user.RoleId = dbUser.RoleId;
                user.userImgPath =dbUser.ImagePath;
                
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
                var dbUser = _userRepository.GetUserById(user.Id);
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

        public UsersListModel GetList(int currentPage, int pageSize)
        {
            var data = _userRepository.GetList();
            UsersListModel model = new UsersListModel
            {
                TotalCount = data.Count,
                list = data.Skip(currentPage * pageSize).Take(pageSize).Select(user => new UserModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    CreatedOn = user.CreatedOn,
                    RoleId = user.RoleId

                }).ToList()
            };
            return model;
        }

        public void DeleteUser(string email)
        {
            if (email != "")
            {
                var user = _userRepository.GetUser(email);
                user.IsDeleted = true;
                _userRepository.AddEditUser(user);
            }
            else
            {
                throw new Exception("user does not exist");
            }
        }

        public UserModel GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
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
