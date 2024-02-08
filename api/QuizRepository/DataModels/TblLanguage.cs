using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblLanguage
    {
        public TblLanguage()
        {
            TblUsers = new HashSet<TblUser>();
        }

        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
