using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblQuestionOption
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string OptionText { get; set; } = null!;
        public bool IsAns { get; set; }
        public bool IsDeleted { get; set; }

        public virtual TblQuestion Question { get; set; } = null!;
    }
}
