using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Models;

namespace Projeto.Repositories
{
    public class ExameRepository : IExameRepository
    {
        private readonly AppDbContext _context;

        public ExameRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Exame> GetAllExames()
        {
            return _context.Exames.ToList();
        }

        public Exame GetExameById(int id)
        {
            return _context.Exames.Find(id);
        }

        public void AddExame(Exame exame)
        {
            _context.Exames.Add(exame);
            _context.SaveChanges();
        }

        public void UpdateExame(Exame exame)
        {
            _context.Exames.Update(exame);
            _context.SaveChanges();
        }

        public void DeleteExame(int id)
        {
            var exame = _context.Exames.Find(id);
            if (exame != null)
            {
                _context.Exames.Remove(exame);
                _context.SaveChanges();
            }
        }
    }
}