using Projeto.Interfaces;
using Projeto.Models;
using Projeto.Models.DTO;
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

        private SolicitanteDTO MapToDTO(Solicitante solicitante)
        {
            return new SolicitanteDTO
            {
                Id = solicitante.Id,
                Nome = solicitante.Nome,
                Permissao = solicitante.Permissao
            };
        }


        public IEnumerable<SolicitanteDTO> GetAllSolicitantes()
        {
            var solicitantes = _solicitanteRepository.GetAllSolicitantes();
            return solicitantes.Select(solicitante => MapToDTO(solicitante));
        }

        public Solicitante GetSolicitanteById(int id)
        {
            return _solicitanteRepository.GetSolicitanteById(id);
        }

        public void AddSolicitante(SolicitanteDTO solicitante)
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
            return string.IsNullOrEmpty(solicitante.Senha);
        }
    }
}