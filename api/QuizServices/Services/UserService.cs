using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
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

        public UserService()
        {
            _userRepository = new UserRepository();
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
                
            }
            return user;
        }

        public UserModel Register(UserModel user)
        {
            TblUser newUser = new TblUser
            {
                Email = user.Email,
                Password = PasswordHelper.Hash(user.Password),
                UserName = user.UserName,
                CreatedOn = DateTime.Now,
                Gender = user.Gender,
                Languageid = user.Languageid,
                RoleId = 2
            };

            _userRepository.SaveUser(newUser);
            return user;
        }
    }
}
