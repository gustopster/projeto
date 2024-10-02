using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Models;

namespace Projeto.Repositories
{
    public class AnimalRepository : IAnimalRepository
    {
        private readonly AppDbContext _context;

        public AnimalRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Animal> GetAllAnimals()
        {
            return _context.Animals.ToList();
        }

        public Animal GetAnimalById(int id)
        {
            return _context.Animals.FirstOrDefault(a => a.Id == id);
        }

        public void AddAnimal(Animal animal)
        {
            _context.Animals.Add(animal);
            _context.SaveChanges();
        }

        public void UpdateAnimal(Animal animal)
        {
            // Se o animal já estiver sendo rastreado, não faça Update
            var existingAnimal = _context.Animals.Find(animal.Id);
            if (existingAnimal != null)
            {
                existingAnimal.DataColeta = animal.DataColeta;
                existingAnimal.Fai = animal.Fai;
                existingAnimal.NumeroIdIpram = animal.NumeroIdIpram;
                existingAnimal.Observacoes = animal.Observacoes;
                _context.SaveChanges();
            }
        }

        public void DeleteAnimal(int id)
        {
            var animal = _context.Animals.FirstOrDefault(a => a.Id == id);
            if (animal != null)
            {
                _context.Animals.Remove(animal);
                _context.SaveChanges();
            }
        }
    }
}