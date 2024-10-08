using Entities.Models;
using QuizRepository.DataModels;
using QuizRepository.IRepository;
using QuizRepository.Repository;
using QuizServices.Interfaces;

namespace QuizServices.Services
{
    public class RolesService : IRolesService
    {
        private readonly IRolesRepository _rolesrepository;

        public RolesService()
        {
            _rolesrepository = new RolesRepository();
        }
        public List<RolesModel> GetList()
        {
            var list = _rolesrepository.GetList();
            List<RolesModel> model = new List<RolesModel>();
            model = list.Select(role => new RolesModel
            {
                Id = role.Id,
                Name = role.Name,
                CreatedOn = role.CreatedOn
            }).ToList();
            return model;
        }
        public RolesModel SaveData(RolesModel model)
        {
            if (model.Id == 0)
            {
                TblRole role = new TblRole
                {
                    Name = model.Name,
                    CreatedOn = DateTime.Now
                };
                _rolesrepository.SaveRole(role);
            }
            else
            {
                var role = _rolesrepository.GetById(model.Id);
                if (role.Id == 0)
                {
                    throw new Exception("role does not exist");
                }
                role.Name = model.Name;
                _rolesrepository.SaveRole(role);
            }
            return model;
        }
        public void DeleteRole(int id)
        {
            if (id != 0)
            {
                var role = _rolesrepository.GetById(id);
                role.IsDeleted = true;
                _rolesrepository.SaveRole(role);
            }
            else
            {
                throw new Exception("try again");
            }
        }
    }
}