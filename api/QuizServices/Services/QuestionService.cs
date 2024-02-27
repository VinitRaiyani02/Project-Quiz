using Entities.Models;
using Microsoft.EntityFrameworkCore;
using QuizRepository.DataModels;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.Interfaces;

namespace QuizServices.Services
{
    public class QuestionService: IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IUserRepository _userRepository;

        public QuestionService()
        {
            _questionRepository = new QuestionRepository();
            _userRepository = new UserRepository();
        }
        public QuestionsModel AddEditQuestion(QuestionsModel question)
        {
            if (question.QuestionType == "Text")
            {
                question.OptionAns.First().IsAns = true;
            }

            string answerText = question.QuestionType == "Text" && question.OptionAns.Count == 1
                 ? question.OptionAns.First().Option
                 : string.Join(",", question.OptionAns.Where(x => x.IsAns == true).Select(ans => ans.Option));
            TblQuestion addEditQuestion;
            if (question.Id != 0)
            {
                addEditQuestion = _questionRepository.GetById(question.Id);
                addEditQuestion.Text = question.QuestionText;
                addEditQuestion.Type = question.QuestionType;
                addEditQuestion.QuestionAns = answerText;
            }
            else
            {
                addEditQuestion = new TblQuestion
                {
                    Type = question.QuestionType,
                    Text = question.QuestionText,
                    QuestionAns = answerText
                };
            }
            var addedQuestion = _questionRepository.AddEditQuestion(addEditQuestion);

            TblQuestionOption options;
            foreach (var option in question.OptionAns)
            {
                if (question.Id == 0)
                {
                    options = new TblQuestionOption
                    {
                        QuestionId = addedQuestion.Id,
                        OptionText = option.Option,
                        IsAns = option.IsAns
                    };
                }
                else
                {
                    options = _questionRepository.GetOptionsById(question.Id, option.Id);
                    options.OptionText = option.Option;
                    options.IsAns = option.IsAns;
                }
                _questionRepository.AddEditOptions(options);
            }
            return question;
        }

        public QuestionListModel GetQuestions(int currentPage, int pageSize, string role)
        {
            var list = _questionRepository.GetQuestions(currentPage,pageSize,role);
            
            return list;
        }

        public QuestionsModel GetQuestionById(int id)
        {
            var question = _questionRepository.GetQuestionById(id);
            return question;
        }

        public void DeleteQuestion(int id)
        {
            var question = _questionRepository.GetById(id);
            question.IsDeleted = true;
            var data = _questionRepository.AddEditQuestion(question);

            var options = _questionRepository.GetOptionsById(id);

            foreach (var option in options)
            {
                option.IsDeleted = true;
                _questionRepository.AddEditOptions(option);
            }
        }

        public QuestionAnsSummaryModel SaveUserQuestionAns(QuestionListModel model)
        {
            QuestionAnsSummaryModel ansModel = new QuestionAnsSummaryModel();
            if (model.Email != "")
            {
                var user = _userRepository.GetUser(model.Email);
                int? testNo = 1;
                var userForTestNo = _questionRepository.GetTestNoForUser(user.Id);
                if (userForTestNo.TestNo != 0 && userForTestNo.TestNo != null)
                {
                    testNo = userForTestNo.TestNo + 1;
                }
                TblUserQuestionAn userQuestion;
                foreach (var question in model.list)
                {
                    if (question.QuestionType == "Text")
                    {
                        question.OptionAns.First().IsAns = true;
                    }

                    string answerText = question.QuestionType == "Text" && question.OptionAns.Count == 1
                        ? question.OptionAns.First().Option
                        : string.Join(",", question.OptionAns.Where(x => x.IsAns == true).Select(ans => ans.Option));

                    userQuestion = new TblUserQuestionAn
                    {
                        QuestionId = question.Id,
                        UserId = user.Id,
                        QuestionAns = answerText,
                        TestNo = testNo
                    };
                    _questionRepository.AddUserQuestion(userQuestion);
                }
                userForTestNo = _questionRepository.GetTestNoForUser(user.Id);
                ansModel.CorrectAnswers = _questionRepository.GetCorrectAnsCount(user.Id, userForTestNo.TestNo);
            }
            return ansModel;
        }

        public List<QuestionViewModel> GetQuestionDetailsForUser(string email)
        {
            List<QuestionViewModel> questionDetails = new List<QuestionViewModel>();
            var user = _userRepository.GetUser(email);
            var userAnswers = _questionRepository.GetUserAnswers(user.Id);

            foreach (var userAnswer in userAnswers)
            {
                var question = _questionRepository.GetById(userAnswer.QuestionId);

                if (question.Id != 0)
                {
                    bool isCorrect = (userAnswer.QuestionAns == question.QuestionAns);

                    var questionViewModel = new QuestionViewModel
                    {
                        QuestionId = question.Id,
                        QuestionText = question.Text,
                        UserAnswer = userAnswer.QuestionAns ?? "",
                        OriginalAnswer = question.QuestionAns,
                        IsCorrect = isCorrect
                    };

                    questionDetails.Add(questionViewModel);
                }
            }
            return questionDetails;
        }
    }
}
