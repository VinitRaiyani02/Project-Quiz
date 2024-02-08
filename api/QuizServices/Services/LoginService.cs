using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizRepository.DataModels;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.IServices;

namespace QuizServices.Services
{
    public class LoginService: ILoginService
    {
        private readonly ILoginRepository _loginRepository;

        public LoginService()
        {
            _loginRepository = new LoginRepository();
        }
        public TblRole GetFirstRole()
        {
            var data = _loginRepository.GetRole();
            return data;
        }
    }
}
