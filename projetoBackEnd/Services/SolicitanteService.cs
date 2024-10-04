using Projeto.Interfaces;
using Projeto.Models;
using System.Collections.Generic;

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
        public Solicitante GetSolicitanteByName(string nome)
        {
            return _solicitanteRepository.GetSolicitanteByName(nome);
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
    }
}