using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;


namespace Entities.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string Email { get; set; } = null!;
        public string? Gender { get; set; }
        public int Languageid { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; } = null!;
        public DateTime? CreatedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
