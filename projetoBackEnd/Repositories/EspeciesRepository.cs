using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Models;

namespace Projeto.Repositories
{
    public class EspeciesRepository : IEspeciesRepository
    {
        private readonly AppDbContext _context;

        public EspeciesRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Especie> GetAllEspecies()
        {
            return _context.Especies.ToList();
        }

        public Especie GetEspeciesById(int id)
        {
            return _context.Especies.Find(id);
        }

        public void AddEspecies(Especie especie)
        {
            _context.Especies.Add(especie);
            _context.SaveChanges();
        }

        public void UpdateEspecies(Especie especie)
        {
            _context.Especies.Update(especie);
            _context.SaveChanges();
        }

        public void DeleteEspecies(int id)
        {
            var especie = _context.Especies.Find(id);
            if (especie != null)
            {
                _context.Especies.Remove(especie);
                _context.SaveChanges();
            }
        }
    }
}