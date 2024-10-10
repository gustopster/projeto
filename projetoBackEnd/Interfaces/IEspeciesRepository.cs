using Projeto.Models;

namespace Projeto.Interfaces
{
    public interface IEspeciesRepository
    {
        IEnumerable<Especie> GetAllEspecies();
        Especie GetEspeciesById(int id);
        void AddEspecies(Especie especie);
        void UpdateEspecies(Especie especie);
        void DeleteEspecies(int id);
    }
}