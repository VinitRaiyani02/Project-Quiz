using System;
using System.Collections.Generic;

namespace QuizRepository.DataModels
{
    public partial class TblUser
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string Email { get; set; } = null!;
        public string? Gender { get; set; }
        public int Languageid { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsDeleted { get; set; }

        public virtual TblLanguage Language { get; set; } = null!;
        public virtual TblRole Role { get; set; } = null!;
    }
}
