using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;
using QuizServices.Interfaces;

namespace QuizServices.IServices
{
    public interface IUserService: IBaseService<UsersListModel,TblUser>
    {
        UserModel Login(string username, string password);
        UserModel Register(UserModel user,string role);

        // UsersListModel GetList(int currentPage,int pageSize);
        void DeleteUser(int id);
        UserModel GetUserById(int id);
    }
}
