using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class RolesRepository : IRolesRepository
    {
        private readonly QuestionsDatabaseContext _context;
        public RolesRepository()
        {
            _context = new QuestionsDatabaseContext();
        }
        public List<TblRole> GetList()
        {
            var data = _context.TblRoles.Where(x => x.IsDeleted == false).ToList();
            return data;
        }
        public void SaveRole(TblRole role)
        {
            if (role.Id == 0)
            {
                _context.TblRoles.Add(role);
            }
            else
            {
                _context.TblRoles.Update(role);
            }
            
            _context.SaveChanges();
        }
        public TblRole GetById(int id){
            var data = _context.TblRoles.FirstOrDefault(r => r.Id == id);
            if (data != null)
            {
                return data;
            }
            return new TblRole();
        }
    }
}