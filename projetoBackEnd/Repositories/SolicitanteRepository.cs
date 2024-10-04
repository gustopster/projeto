using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Models;

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

        public void AddSolicitante(Solicitante solicitante)
        {
            _context.Solicitantes.Add(solicitante);
            _context.SaveChanges();
        }

        public void UpdateSolicitante(Solicitante solicitante)
        {
            _context.Solicitantes.Update(solicitante);
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
    }
}