using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class UsersListModel
    {
        public List<UserModel> list { get; set; }
        public int TotalCount { get; set; }
    }
}
