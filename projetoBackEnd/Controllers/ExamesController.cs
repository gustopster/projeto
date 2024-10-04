using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamesController : ControllerBase
    {
        private readonly ExameService _exameService;

        public ExamesController(ExameService exameService)
        {
            _exameService = exameService;
        }

        [HttpGet]
        public IActionResult GetExames()
        {
            var exames = _exameService.GetAllExames();
            return Ok(exames);
        }

        [HttpGet("{id}")]
        public IActionResult GetExameById(int id)
        {
            var exame = _exameService.GetExameById(id);
            if (exame == null)
            {
                return NotFound();
            }
            return Ok(exame);
        }

        [HttpPost]
        public IActionResult CreateExame([FromBody] Exame newExame)
        {
            _exameService.AddExame(newExame);
            return CreatedAtAction(nameof(GetExameById), new { id = newExame.Id }, newExame);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExame(int id, [FromBody] Exame updatedExame)
        {
            var existingExame = _exameService.GetExameById(id);
            if (existingExame == null)
            {
                return NotFound();
            }

            existingExame.Nome = updatedExame.Nome;

            _exameService.UpdateExame(existingExame);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExame(int id)
        {
            var exame = _exameService.GetExameById(id);
            if (exame == null)
            {
                return NotFound();
            }

            _exameService.DeleteExame(id);
            return NoContent();
        }
    }
}