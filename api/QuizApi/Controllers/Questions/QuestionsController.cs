using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;
using System.Security.Claims;

namespace QuizApi.Controllers.Questions
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : Controller
    {
        private readonly IQuestionService _questionService;

        public QuestionsController()
        {
            _questionService = new QuestionService();
        }
        [HttpGet]
        public ApiResponse<QuestionListModel> GetQuestions(int currentPage, int pageSize)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var role = "";
            if (identity != null)
            {
                role = identity.FindFirst("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            }
            role ??= "2";
            var data = _questionService.GetQuestions(currentPage,pageSize,role);
            return new ApiResponse<QuestionListModel>(200, true, "questions loaded successfully", data);
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public ApiResponse<QuestionsModel> AddEditQuestion(QuestionsModel question)
        {
            var data = _questionService.AddEditQuestion(question);
            return new ApiResponse<QuestionsModel>(200, true, "question added successfully", data);
        }

        [HttpDelete]
        [Authorize(Roles = "1")]
        public ApiResponse<QuestionsModel> DeleteQuestion(int id)
        {
            _questionService.DeleteQuestion(id);
            return new ApiResponse<QuestionsModel>(200, true, "question deleted successfully");
        }
    }
}
