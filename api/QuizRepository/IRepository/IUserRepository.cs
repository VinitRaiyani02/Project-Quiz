using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface IUserRepository: IGenericRepository<TblUser>
    {
        TblUser GetUser(string email);
        void SaveUser(TblUser user);
        List<TblUser> GetUserList();
        void AddEditUser(TblUser user);
        void IsEmailAlreadyExist(string email);
    }
}
