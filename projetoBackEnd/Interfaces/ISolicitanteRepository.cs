using Projeto.Models;
using Projeto.Models.DTO;

namespace Projeto.Interfaces
{
    public interface ISolicitanteRepository
    {
        IEnumerable<Solicitante> GetAllSolicitantes();
        Solicitante GetSolicitanteById(int id);
        Solicitante GetSolicitanteByName(string nome);
        void AddSolicitante(SolicitanteDTO solicitante);
        void UpdateSolicitante(Solicitante solicitante);
        bool DefinirSenha(Solicitante solicitante, string senha);
        bool IsFirstTimeUser(Solicitante solicitante);
        void DeleteSolicitante(int id);
    }
}
