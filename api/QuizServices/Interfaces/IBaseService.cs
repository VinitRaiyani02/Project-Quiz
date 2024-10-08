using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizServices.Interfaces
{
    public interface IBaseService<TModel,TItem>
    {
        TModel GetAllList(int currentPage, int pageSize, TModel model);
    }
}