using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class LanguageRepository: ILanguageRepository
    {
        private readonly QuestionsDatabaseContext _context;

        public LanguageRepository()
        {
            _context = new QuestionsDatabaseContext();
        }
        public List<TblLanguage> GetLanguageList()
        {
            var languages = _context.TblLanguages.Where(x => x.IsDeleted == false).ToList();
            return languages;
        }
    }
}
