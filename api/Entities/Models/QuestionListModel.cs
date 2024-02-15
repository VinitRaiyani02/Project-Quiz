using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class QuestionListModel
    {
        public List<QuestionsModel> list { get; set; }
        public int TotalCount { get; set; }
        public string? Email { get; set; }
    }
}
