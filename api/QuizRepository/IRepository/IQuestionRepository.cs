using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface IQuestionRepository
    {
        TblQuestion AddEditQuestion(TblQuestion question);
        void AddEditOptions(TblQuestionOption options);
        QuestionListModel GetQuestions(int currentPage, int pageSize, string role);

        QuestionsModel GetQuestionById(int id);
        TblQuestion GetById(int id);
        TblQuestionOption GetOptionsById(int questionId,int optionId);
        List<TblQuestionOption> GetOptionsById(int id);
        TblUserQuestionAn GetTestNoForUser(int userId);
        void AddUserQuestion(TblUserQuestionAn question);
        int GetCorrectAnsCount(int userId,int? testNo);
        List<TblUserQuestionAn> GetUserAnswers(int userId);
    }
}
