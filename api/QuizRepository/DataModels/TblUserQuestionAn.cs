using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblUserQuestionAn
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public string? QuestionAns { get; set; }
        public int? TestNo { get; set; }

        public virtual TblQuestion Question { get; set; } = null!;
        public virtual TblUser User { get; set; } = null!;
    }
}
