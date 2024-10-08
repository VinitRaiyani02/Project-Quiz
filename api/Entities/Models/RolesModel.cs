using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class RolesModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime? CreatedOn { get; set; }
    }
}