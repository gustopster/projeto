using Projeto.Models;

namespace Projeto.Interfaces
{
    public interface ISolicitanteRepository
    {
        IEnumerable<Solicitante> GetAllSolicitantes();
        Solicitante GetSolicitanteById(int id);
        Solicitante GetSolicitanteByName(string nome);
        void AddSolicitante(Solicitante solicitante);
        void UpdateSolicitante(Solicitante solicitante);
        void DeleteSolicitante(int id);
    }
}
