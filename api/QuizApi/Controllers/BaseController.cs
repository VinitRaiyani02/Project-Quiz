using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;

namespace QuizApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<TModel,TItem> : ControllerBase
    where TModel: class, new()
    where TItem: class, new()
    {
        private readonly IBaseService<TModel,TItem> _service;
        
        public BaseController(IBaseService<TModel,TItem> service)
        {
            _service = service;
        }
        
        [HttpGet]
        public ApiResponse<TModel> GetList(int currentPage, int pageSize){
            TModel model = new TModel();
            var data = _service.GetAllList(currentPage,pageSize,model);
            return new ApiResponse<TModel>(200, true, "loaded successfully", data);
        }
    }
}