using Projeto.Interfaces;
using Projeto.Models;
using projetoBackEnd.Models;

namespace Projeto.Services
{
    public class SolicitanteService
    {
        private readonly ISolicitanteRepository _solicitanteRepository;

        public SolicitanteService(ISolicitanteRepository solicitanteRepository)
        {
            _solicitanteRepository = solicitanteRepository;
        }

        public IEnumerable<Solicitante> GetAllSolicitantes()
        {
            return _solicitanteRepository.GetAllSolicitantes();
        }

        public Solicitante GetSolicitanteById(int id)
        {
            return _solicitanteRepository.GetSolicitanteById(id);
        }

        public void AddSolicitante(Solicitante solicitante)
        {
            _solicitanteRepository.AddSolicitante(solicitante);
        }

        public void UpdateSolicitante(Solicitante solicitante)
        {
            _solicitanteRepository.UpdateSolicitante(solicitante);
        }

        public void DeleteSolicitante(int id)
        {
            _solicitanteRepository.DeleteSolicitante(id);
        }

        public Solicitante GetSolicitanteByName(string nome)
        {
            return _solicitanteRepository.GetSolicitanteByName(nome);
        }

        public bool DefinirSenha(Solicitante solicitante, string senha)
        {
            return _solicitanteRepository.DefinirSenha(solicitante, senha);
        }

        public bool VerificarSenha(VerificarSenhaRequest request)
        {
            var solicitante = _solicitanteRepository.GetSolicitanteByName(request.Nome);
            if (solicitante == null)
            {
                return false;
            }

            return solicitante.Senha == request.Senha;
        }
        public bool IsFirstTimeUser(Solicitante solicitante)
        {
            // Verifica se a senha é nula ou vazia
            return string.IsNullOrEmpty(solicitante.Senha);
        }
    }
}