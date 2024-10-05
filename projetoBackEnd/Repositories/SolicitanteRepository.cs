using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Models;
using Projeto.Models.DTO;
using System.Linq;

namespace Projeto.Repositories
{
    public class SolicitanteRepository : ISolicitanteRepository
    {
        private readonly AppDbContext _context;

        public SolicitanteRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Solicitante> GetAllSolicitantes()
        {
            return _context.Solicitantes.ToList();
        }

        public Solicitante GetSolicitanteById(int id)
        {
            return _context.Solicitantes.Find(id);
        }

        public void AddSolicitante(SolicitanteDTO solicitante)
        {
            var existingSolicitante = new Solicitante(
                solicitante.Id,
                solicitante.Nome,
                solicitante.Permissao
            );

            _context.Solicitantes.Add(existingSolicitante);
            _context.SaveChanges();
        }


        public void UpdateSolicitante(Solicitante solicitante)
        {
            // Aqui você pode usar a abordagem de marcar a entidade como modificada
            _context.Solicitantes.Update(solicitante); // Somente se necessário; pode ser redundante se já estiver sendo rastreada
            _context.SaveChanges();
        }

        public void DeleteSolicitante(int id)
        {
            var solicitante = _context.Solicitantes.Find(id);
            if (solicitante != null)
            {
                _context.Solicitantes.Remove(solicitante);
                _context.SaveChanges();
            }
        }

        public Solicitante GetSolicitanteByName(string nome)
        {
            return _context.Solicitantes.FirstOrDefault(s => s.Nome.ToLower() == nome.ToLower());
        }

        public bool IsFirstTimeUser(Solicitante solicitante)
        {
            return string.IsNullOrEmpty(solicitante.Senha);
        }

        public bool DefinirSenha(Solicitante solicitante, string senha)
        {
            solicitante.Senha = senha;
            _context.Solicitantes.Update(solicitante);

            return _context.SaveChanges() > 0;
        }

    }
}