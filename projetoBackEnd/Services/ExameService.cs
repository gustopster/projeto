using Projeto.Interfaces;
using Projeto.Models;
using System.Collections.Generic;

namespace Projeto.Services
{
    public class ExameService
    {
        private readonly IExameRepository _exameRepository;

        public ExameService(IExameRepository exameRepository)
        {
            _exameRepository = exameRepository;
        }

        public IEnumerable<Exame> GetAllExames()
        {
            return _exameRepository.GetAllExames();
        }

        public Exame GetExameById(int id)
        {
            return _exameRepository.GetExameById(id);
        }

        public void AddExame(Exame exame)
        {
            _exameRepository.AddExame(exame);
        }

        public void UpdateExame(Exame exame)
        {
            _exameRepository.UpdateExame(exame);
        }

        public void DeleteExame(int id)
        {
            _exameRepository.DeleteExame(id);
        }
    }
}