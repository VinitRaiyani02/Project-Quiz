using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.Interfaces;

namespace QuizServices.Services
{
    public class LanguageService: ILanguageService
    {
        private readonly ILanguageRepository _languageRepository;

        public LanguageService()
        {
            _languageRepository = new LanguageRepository();
        }
        public SelectList GetLanguageSelectList()
        {
            var languages = _languageRepository.GetLanguageList();

            var languageList = new SelectList(
                 languages.Select(v => new SelectListItem
                 {
                     Text = v.Text.ToString(),
                     Value = v.Id.ToString(),
                     Selected = false
                 }).ToList(),
                 "Value",
                 "Text",
                 "Selected");
            return languageList;
        }
    }
}
