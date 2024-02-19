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
            throw new Exception("user doesn't exist");
            
        }
        public TblUser GetUserById(int id)
        {
            UserModel user = new UserModel();
            var dbUser = _context.TblUsers.FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
            if (dbUser != null)
            {
                return dbUser;
            }
            throw new Exception("user doesn't exist");

        }

        public void SaveUser(TblUser user)
        {
            if (user.Id == 0)
            {
                _context.TblUsers.Add(user);
            }
            else
            {
                _context.TblUsers.Update(user);
            }
            
            _context.SaveChanges();
        }

        public List<TblUser> GetList()
        {
            var userList = _context.TblUsers.Where(u => u.IsDeleted == false).ToList();
            return userList;
        }
        public void AddEditUser(TblUser user)
        {
            if (user.Id == 0)
            {
                _context.TblUsers.Add(user);
            }
            else
            {
                _context.TblUsers.Update(user);
            }
            _context.SaveChanges();
        }
    }
}
