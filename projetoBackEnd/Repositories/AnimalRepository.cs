using NomeDoProjetoBackEnd.Interfaces;
using NomeDoProjetoBackEnd.Models;

namespace NomeDoProjetoBackEnd.Repositories
{
    public class AnimalRepository : IAnimalRepository
    {
        private static List<Animal> Animals = new List<Animal>
        {
            new Animal { Id = 1, Name = "Leão", Type = "Mamífero" },
            new Animal { Id = 2, Name = "Papagaio", Type = "Ave" },
            new Animal { Id = 3, Name = "Cobra", Type = "Réptil" }
        };

        public IEnumerable<Animal> GetAllAnimals()
        {
            return Animals;
        }

        public Animal GetAnimalById(int id)
        {
            return Animals.FirstOrDefault(a => a.Id == id);
        }

        public void AddAnimal(Animal animal)
        {
            animal.Id = Animals.Count + 1;
            Animals.Add(animal);
        }

        public void UpdateAnimal(Animal animal)
        {
            var existingAnimal = Animals.FirstOrDefault(a => a.Id == animal.Id);
            if (existingAnimal != null)
            {
                existingAnimal.Name = animal.Name;
                existingAnimal.Type = animal.Type;
            }
        }

        public void DeleteAnimal(int id)
        {
            var animal = Animals.FirstOrDefault(a => a.Id == id);
            if (animal != null)
            {
                Animals.Remove(animal);
            }
        }
    }
}