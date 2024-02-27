using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface IRolesRepository
    {
        List<TblRole> GetList();
        void SaveRole(TblRole role);
        TblRole GetById(int id);
    }
}