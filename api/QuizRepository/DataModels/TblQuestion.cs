using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblQuestion
    {
        public TblQuestion()
        {
            TblQuestionOptions = new HashSet<TblQuestionOption>();
            TblUserQuestionAns = new HashSet<TblUserQuestionAn>();
        }

        public int Id { get; set; }
        public string Type { get; set; } = null!;
        public string Text { get; set; } = null!;
        public string QuestionAns { get; set; } = null!;
        public bool IsDeleted { get; set; }

        public virtual ICollection<TblQuestionOption> TblQuestionOptions { get; set; }
        public virtual ICollection<TblUserQuestionAn> TblUserQuestionAns { get; set; }
    }
}
