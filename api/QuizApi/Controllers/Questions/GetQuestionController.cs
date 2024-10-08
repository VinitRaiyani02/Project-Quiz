using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;

namespace QuizApi.Controllers.Questions
{
    [ApiController]
    [Route("[controller]")]
    public class GetQuestionController : Controller
    {
        private readonly IQuestionService _questionService;

        public GetQuestionController()
        {
            _questionService = new QuestionService();
        }

        [HttpGet]
        public ApiResponse<QuestionsModel> GetQuestionById(int id)
        {
            var data = _questionService.GetQuestionById(id);
            return new ApiResponse<QuestionsModel>(200, true, "question loaded successfully", data);
        }
    }
}
