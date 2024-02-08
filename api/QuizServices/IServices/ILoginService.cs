using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizRepository.DataModels;

namespace QuizServices.IServices
{
    public interface ILoginService
    {
        TblRole GetFirstRole();
    }
}
