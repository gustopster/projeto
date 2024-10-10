using Projeto.Interfaces;
using Projeto.Models;

namespace Projeto.Services
{
    public class EspecieService
    {
        private readonly IEspeciesRepository _especiesRepository;

        public EspecieService(IEspeciesRepository especiesRepository)
        {
            _especiesRepository = especiesRepository;
        }

        public IEnumerable<Especie> GetAllEspecies()
        {
            return _especiesRepository.GetAllEspecies();
        }

        public Especie GetEspecieById(int id)
        {
            return _especiesRepository.GetEspeciesById(id);
        }

        public void AddEspecie(Especie especie)
        {
            _especiesRepository.AddEspecies(especie);
        }

        public void UpdateEspecie(Especie especie)
        {
            _especiesRepository.UpdateEspecies(especie);
        }

        public void DeleteEspecie(int id)
        {
            _especiesRepository.DeleteEspecies(id);
        }
    }
}