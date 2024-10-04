using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Services;

namespace Projeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitantesController : ControllerBase
    {
        private readonly SolicitanteService _solicitanteService;

        public SolicitantesController(SolicitanteService solicitanteService)
        {
            _solicitanteService = solicitanteService;
        }

        [HttpGet]
        public IActionResult GetSolicitantes()
        {
            var solicitantes = _solicitanteService.GetAllSolicitantes();
            return Ok(solicitantes);
        }

        [HttpGet("{id}")]
        public IActionResult GetSolicitanteById(int id)
        {
            var solicitante = _solicitanteService.GetSolicitanteById(id);
            if (solicitante == null)
            {
                return NotFound();
            }
            return Ok(solicitante);
        }

        [HttpPost]
        public IActionResult CreateSolicitante([FromBody] Solicitante newSolicitante)
        {
            _solicitanteService.AddSolicitante(newSolicitante);
            return CreatedAtAction(nameof(GetSolicitanteById), new { id = newSolicitante.Id }, newSolicitante);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateSolicitante(int id, [FromBody] Solicitante updatedSolicitante)
        {
            var existingSolicitante = _solicitanteService.GetSolicitanteById(id);
            if (existingSolicitante == null)
            {
                return NotFound();
            }

            existingSolicitante.Nome = updatedSolicitante.Nome;
            existingSolicitante.Permissao = updatedSolicitante.Permissao;

            _solicitanteService.UpdateSolicitante(existingSolicitante);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSolicitante(int id)
        {
            var solicitante = _solicitanteService.GetSolicitanteById(id);
            if (solicitante == null)
            {
                return NotFound();
            }

            _solicitanteService.DeleteSolicitante(id);
            return NoContent();
        }
    }
}