using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblRole
    {
        public TblRole()
        {
            TblUsers = new HashSet<TblUser>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<TblUser> TblUsers { get; set; }
    }
}
