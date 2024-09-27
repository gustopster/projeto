using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimalsController : ControllerBase
    {
        private readonly AnimalService _animalService;

        public AnimalsController(AnimalService animalService)
        {
            _animalService = animalService;
        }

        [HttpGet]
        public IActionResult GetAnimals()
        {
            var animals = _animalService.GetAllAnimals();
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnimalById(int id)
        {
            var animal = _animalService.GetAnimalById(id);
            if (animal == null)
            {
                return NotFound();
            }
            return Ok(animal);
        }

        [HttpPost]
        public IActionResult CreateAnimal([FromBody] Animal newAnimal)
        {
            _animalService.AddAnimal(newAnimal);
            return CreatedAtAction(nameof(GetAnimalById), new { id = newAnimal.Id }, newAnimal);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAnimal(int id, [FromBody] Animal updatedAnimal)
        {
            var existingAnimal = _animalService.GetAnimalById(id);
            if (existingAnimal == null)
            {
                return NotFound();
            }

            existingAnimal.Name = updatedAnimal.Name;
            existingAnimal.Type = updatedAnimal.Type;

            _animalService.UpdateAnimal(existingAnimal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _animalService.GetAnimalById(id);
            if (animal == null)
            {
                return NotFound();
            }

            _animalService.DeleteAnimal(id);
            return NoContent();
        }
    }
}