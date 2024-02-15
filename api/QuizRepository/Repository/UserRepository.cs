using Entities.Models;
using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class UserRepository: IUserRepository
    {
        private readonly QuestionsDatabaseContext _context;

        public UserRepository()
        {
            _context = new QuestionsDatabaseContext();
        }

        public TblUser GetUser(string email)
        {
            UserModel user = new UserModel();
            var dbUser = _context.TblUsers.FirstOrDefault(x => x.Email == email && x.IsDeleted == false);
            if (dbUser != null)
            {
                return dbUser;
            }
            throw new Exception("Enter registered email");
            
        }
        
        public void SaveUser(TblUser user)
        {
            _context.TblUsers.Add(user);
            _context.SaveChanges();
        }
    }
}
