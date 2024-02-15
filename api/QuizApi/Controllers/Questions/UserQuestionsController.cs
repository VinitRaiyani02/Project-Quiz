using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;
using System.Security.Claims;

namespace QuizApi.Controllers.Questions
{
    [ApiController]
    [Route("[controller]")]
    public class UserQuestionsController : Controller
    {
        private readonly IQuestionService _questionService;

        public UserQuestionsController()
        {
            _questionService = new QuestionService();
        }

        [HttpGet]
        public ApiResponse<List<QuestionViewModel>> GetUserAnsReportList()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var email = "";
            if (identity != null)
            {
                email = identity.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            }

            var data = _questionService.GetQuestionDetailsForUser(email);
            return new ApiResponse<List<QuestionViewModel>>(200, true, "questions submitted successfully", data);
        }

        [HttpPost]
        public ApiResponse<QuestionAnsSummaryModel> SaveData(QuestionListModel model)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            
            if (identity != null)
            {
                model.Email = identity.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            }
            var data = _questionService.SaveUserQuestionAns(model);
            return new ApiResponse<QuestionAnsSummaryModel>(200, true, "questions submitted successfully", data);
        }
    }
}
