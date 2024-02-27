using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;

namespace QuizServices.Interfaces
{
    public interface IRolesService
    {
        List<RolesModel> GetList();
        RolesModel SaveData(RolesModel model);
        void DeleteRole(int id);
    }
}