using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.Interfaces;

namespace QuizServices.Services
{
    public class BaseService<TModel,TItem>: IBaseService<TModel,TItem>
    where TModel: class, new()
    where TItem: class, new()
    {
        private readonly IGenericRepository<TItem> _genericRepository;
        protected readonly IMapper _mapper;

        public BaseService(IMapper mapper)
        {
            _genericRepository = new GenericRepository<TItem>();
            _mapper = mapper;
        }
        public TModel GetAllList(int currentPage, int pageSize, TModel model){
            model = GetList(currentPage,pageSize,model);
            return model;
        }
        public virtual TModel GetList(int currentPage, int pageSize, TModel model){
            return model;
        }
    }
}