using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface IUserRepository
    {
        TblUser GetUser(string email);
        void SaveUser(TblUser user);
    }
}
