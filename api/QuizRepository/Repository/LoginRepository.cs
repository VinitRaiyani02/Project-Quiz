using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class LoginRepository: ILoginRepository
    {
        private readonly QuestionsDatabaseContext _context;

        public LoginRepository()
        {
            _context = new QuestionsDatabaseContext();
        }
        public TblRole GetRole()
        {
            var data = _context.TblRoles.FirstOrDefault(x => x.Id == 1);
            return data;
        }
    }
}
