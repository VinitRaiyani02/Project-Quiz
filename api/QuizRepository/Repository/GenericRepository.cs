using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizRepository.DataModels;
using QuizRepository.IRepository;

namespace QuizRepository.Repository
{
    public class GenericRepository<TItem> : IGenericRepository<TItem> where TItem : class
    {
        private readonly QuestionsDatabaseContext _context;

        internal DbSet<TItem> DbSet;

        public GenericRepository()
        {
            _context = new QuestionsDatabaseContext();
            DbSet = _context.Set<TItem>();
        }
        public virtual TItem Add(TItem entity)
        {
            DbSet.Add(entity);
            _context.SaveChanges();
            return entity;
        }
        public virtual IEnumerable<TItem> GetData(){
            IEnumerable<TItem> data = DbSet;
            return data;
        }
        public virtual TItem GetById(Expression<Func<TItem, bool>> expression, string errorMsg)
        {
            var data = DbSet.FirstOrDefault(expression);
            if (data == null)
            {
                throw new Exception(errorMsg + "doesn't exist");
            }
            return data;
        }
    }
}