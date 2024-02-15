using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;

namespace QuizServices.Interfaces
{
    public interface IQuestionService
    {
        QuestionsModel AddEditQuestion(QuestionsModel question);
        QuestionListModel GetQuestions(int currentPage, int pageSize,string role);
        QuestionsModel GetQuestionById(int id);
        void DeleteQuestion(int id);
        QuestionAnsSummaryModel SaveUserQuestionAns(QuestionListModel model);
        List<QuestionViewModel> GetQuestionDetailsForUser(string email);
    }
}
