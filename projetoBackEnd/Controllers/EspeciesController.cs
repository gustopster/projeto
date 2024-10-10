using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EspeciesController : ControllerBase
    {
        private readonly EspecieService _especieService;

        public EspeciesController(EspecieService especieService)
        {
            _especieService = especieService;
        }

        // GET: api/especies
        [HttpGet]
        public IActionResult GetEspecies()
        {
            var especies = _especieService.GetAllEspecies();
            return Ok(especies);
        }

        // GET: api/especies/{id}
        [HttpGet("{id}")]
        public IActionResult GetEspecieById(int id)
        {
            var especie = _especieService.GetEspecieById(id);
            if (especie == null)
            {
                return NotFound();
            }
            return Ok(especie);
        }

        // POST: api/especies
        [HttpPost]
        public IActionResult CreateEspecie([FromBody] Especie newEspecie)
        {
            _especieService.AddEspecie(newEspecie);
            return CreatedAtAction(nameof(GetEspecieById), new { id = newEspecie.Id }, newEspecie);
        }

        // PUT: api/especies/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateEspecie(int id, [FromBody] Especie updatedEspecie)
        {
            var existingEspecie = _especieService.GetEspecieById(id);
            if (existingEspecie == null)
            {
                return NotFound();
            }

            existingEspecie.Nome = updatedEspecie.Nome;

            _especieService.UpdateEspecie(existingEspecie);
            return NoContent();
        }

        // DELETE: api/especies/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEspecie(int id)
        {
            var especie = _especieService.GetEspecieById(id);
            if (especie == null)
            {
                return NotFound();
            }

            _especieService.DeleteEspecie(id);
            return NoContent();
        }
    }
}