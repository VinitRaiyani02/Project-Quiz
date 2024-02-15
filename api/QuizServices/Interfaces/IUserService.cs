using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;

namespace QuizServices.IServices
{
    public interface IUserService
    {
        UserModel Login(string username, string password);
        UserModel Register(UserModel user);
    }
}
