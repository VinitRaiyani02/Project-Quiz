using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using QuizRepository.DataModels;

namespace QuizRepository.IRepository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Add(TEntity entity);
        IEnumerable<TEntity> GetData();
        TEntity GetById(Expression<Func<TEntity, bool>> expression,string errorMsg);
    }
}