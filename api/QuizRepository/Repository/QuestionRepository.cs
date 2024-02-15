using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class QuestionRepository: IQuestionRepository
    {
        private readonly QuestionsDatabaseContext _context;

        public QuestionRepository()
        {
            _context = new QuestionsDatabaseContext();
        }
        public TblQuestion AddEditQuestion(TblQuestion question)
        {
            if (question.Id == 0)
            {
                _context.TblQuestions.Add(question);
            }
            else
            {
                _context.TblQuestions.Update(question);
            }
            _context.SaveChanges();
            return question;
        }

        public void AddEditOptions(TblQuestionOption options)
        {
            if (options.Id == 0)
            {
                _context.TblQuestionOptions.Add(options);
            }
            else
            {
                _context.TblQuestionOptions.Update(options);
            }
            _context.SaveChanges();
        }

        public QuestionListModel GetQuestions(int currentPage, int pageSize, string role)
        {
            var questionsList = _context.TblQuestions
                .Where(x => x.IsDeleted == false);
            List<QuestionsModel> newList;
            if (role == "1")
            {
                int recordsToSkip = (currentPage) * pageSize;
                newList = questionsList.OrderBy(question => question.Id)
                   .Skip(recordsToSkip)
                   .Take(pageSize)
                   .Select(question => new QuestionsModel
                   {
                       Id = question.Id,
                       QuestionText = question.Text,
                       QuestionType = question.Type,
                       OptionAns = _context.TblQuestionOptions
                           .Where(option => option.QuestionId == question.Id && option.IsDeleted == false)
                           .Select(option => new OptionAnsItem
                           {
                               Option = option.OptionText,
                               IsAns = option.IsAns
                           })
                           .ToList()
                   })
                   .ToList();


            }
            else
            {
                var shuffledQuestionsList = questionsList.OrderBy(question => Guid.NewGuid()).ToList();

                newList = shuffledQuestionsList
                   .Take(10)
                   .Select(question => new QuestionsModel
                   {
                       Id = question.Id,
                       QuestionText = question.Text,
                       QuestionType = question.Type,
                       OptionAns = _context.TblQuestionOptions
                           .Where(option => option.QuestionId == question.Id && option.IsDeleted == false)
                           .Select(option => new OptionAnsItem
                           {
                               Option = question.Type == "Text" ? "" : option.OptionText,
                               IsAns = false
                           })
                           .ToList()
                   })
                   .ToList();
            }
            var questionListModel = new QuestionListModel
            {
                list = newList,
                TotalCount = questionsList.Count()
            };
            return questionListModel;

        }

        public TblQuestion GetById(int id)
        {
            var data = _context.TblQuestions.FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
            if (data != null)
            {
                return data;
            }
            throw new Exception("question does not exist");
        }

        public TblQuestionOption GetOptionsById(int questionId, int optionId)
        {
            var data = _context.TblQuestionOptions.FirstOrDefault(x =>
                x.Id == optionId && x.QuestionId == questionId && x.IsDeleted == false);
            if (data != null)
            {
                return data;
            }
            return new TblQuestionOption();
        }

        public List<TblQuestionOption> GetOptionsById(int id)
        {
            var data = _context.TblQuestionOptions.Where(o => o.QuestionId == id && o.IsDeleted == false).ToList();
            if (data.Any())
            {
                return data;
            }

            throw new Exception("question options does not exist");
        }
        public QuestionsModel GetQuestionById(int id)
        {
            QuestionsModel model = new QuestionsModel();
            var question = _context.TblQuestions
                .Where(q => q.Id == id && q.IsDeleted == false)
                .Select(q => new QuestionsModel
                {
                    Id = q.Id,
                    QuestionText = q.Text,
                    QuestionType = q.Type,
                    OptionAns = _context.TblQuestionOptions
                        .Where(o => o.QuestionId == q.Id && o.IsDeleted == false)
                        .Select(o => new OptionAnsItem
                        {
                            Id = o.Id,
                            Option = o.OptionText,
                            IsAns = o.IsAns
                        })
                        .ToList()
                })
                .FirstOrDefault();
            if (question != null)
            {
                model = question;
            }
            return model;
        }

        public TblUserQuestionAn GetTestNoForUser(int userId)
        {
            var user = _context.TblUserQuestionAns.OrderByDescending(x => x.Id).FirstOrDefault(q => q.UserId == userId);
            if (user != null)
            {
                return user;
            }

            return new TblUserQuestionAn();
        }
        public void AddUserQuestion(TblUserQuestionAn question)
        {
            _context.TblUserQuestionAns.Add(question);
            _context.SaveChanges();
        }

        public int GetCorrectAnsCount(int userId,int? testNo)
        {
            var correctAnswers = _context.TblUserQuestionAns.Where(x => x.UserId == userId && x.TestNo == testNo)
                .Join(_context.TblQuestions,
                    uqa => uqa.QuestionId,
                    q => q.Id,
                    (uqa, q) => new { UserAnswer = uqa.QuestionAns, CorrectAnswer = q.QuestionAns })
                .Count(a => a.UserAnswer == a.CorrectAnswer);
            return correctAnswers;
        }

        public List<TblUserQuestionAn> GetUserAnswers(int userId)
        {
            var userAnswers = _context.TblUserQuestionAns.OrderByDescending(x => x.TestNo).Where(u => u.UserId == userId).Take(10).ToList();
            return userAnswers;
        }
    }
}
