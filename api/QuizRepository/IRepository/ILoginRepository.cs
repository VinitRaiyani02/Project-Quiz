using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface ILoginRepository
    {
        TblRole GetRole();
    }
}
