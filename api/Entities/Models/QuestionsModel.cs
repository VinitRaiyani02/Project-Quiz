using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class QuestionsModel
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }
        public List<OptionAnsItem> OptionAns { get; set; }
    }
    public class OptionAnsItem
    {
        public int Id { get; set; }
        public string Option { get; set; }
        public bool IsAns { get; set; }
    }
}
