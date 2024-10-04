using Projeto.Models;

namespace Projeto.Interfaces
{
    public interface IExameRepository
    {
        IEnumerable<Exame> GetAllExames();
        Exame GetExameById(int id);
        void AddExame(Exame exame);
        void UpdateExame(Exame exame);
        void DeleteExame(int id);
    }
}
