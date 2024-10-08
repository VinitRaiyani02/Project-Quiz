using Entities.Models;
using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class UserRepository: GenericRepository<TblUser> ,IUserRepository
    {
        private readonly QuestionsDatabaseContext _context;

        public UserRepository()
        {
            _context = new QuestionsDatabaseContext();
        }

        public TblUser GetUser(string email)
        {
            var dbUser = _context.TblUsers.FirstOrDefault(x => x.Email == email && x.IsDeleted == false);
            if (dbUser != null)
            {
                return dbUser;
            }
            throw new Exception("user doesn't exist");
        }
        
        public void IsEmailAlreadyExist(string email){
            var user = _context.TblUsers.FirstOrDefault(x => x.Email == email && x.IsDeleted == false);
            if(user != null){
                throw new Exception("you can't use this email because this email is already registered with us.");
            }
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

        public List<TblUser> GetUserList()
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
