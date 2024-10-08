using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;

namespace QuizApi.Controllers.Language
{
    [ApiController]
    [Route("[controller]")]
    public class LanguageController : Controller
    {
        private readonly ILanguageService _languageService;

        public LanguageController()
        {
            _languageService = new LanguageService();
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetLanguageList()
        {
            var list = _languageService.GetLanguageSelectList();
            return Ok(list);
        }
    }
}
