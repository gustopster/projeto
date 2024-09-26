using Projeto.Interfaces;
using Projeto.Models;

namespace Projeto.Services
{
    public class AnimalService
    {
        private readonly IAnimalRepository _animalRepository;

        public AnimalService(IAnimalRepository animalRepository)
        {
            _animalRepository = animalRepository;
        }

        public IEnumerable<Animal> GetAllAnimals()
        {
            return _animalRepository.GetAllAnimals();
        }

        public Animal GetAnimalById(int id)
        {
            return _animalRepository.GetAnimalById(id);
        }

        public void AddAnimal(Animal animal)
        {
            _animalRepository.AddAnimal(animal);
        }

        public void UpdateAnimal(Animal animal)
        {
            _animalRepository.UpdateAnimal(animal);
        }

        public void DeleteAnimal(int id)
        {
            _animalRepository.DeleteAnimal(id);
        }
    }
}