using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Projeto.Models.DTO;
using Projeto.Services;
using projetoBackEnd.Models;

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
        public IActionResult UpdateSolicitante(int id, [FromBody] SolicitanteDTO updatedSolicitanteDto)
        {
            var existingSolicitante = _solicitanteService.GetSolicitanteById(id);
            if (existingSolicitante == null)
            {
                return NotFound();
            }

            existingSolicitante.Nome = updatedSolicitanteDto.Nome;
            existingSolicitante.Permissao = updatedSolicitanteDto.Permissao;

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

        [HttpGet("por-nome/{nome}")]
        public IActionResult VerificarSolicitantePorNome(string nome)
        {
            var solicitante = _solicitanteService.GetSolicitanteByName(nome);
            if (solicitante == null)
            {
                return NotFound("Solicitante não encontrado.");
            }

            if (_solicitanteService.IsFirstTimeUser(solicitante))
            {
                return Ok(false);
            }

            return Ok(true);
        }

        [HttpPost("verificar-senha")]
        public IActionResult VerificarSenha([FromBody] VerificarSenhaRequest request)
        {
            // Verifica a senha, assumindo que o solicitante já foi autenticado anteriormente
            bool senhaCorreta = _solicitanteService.VerificarSenha(request);

            if (!senhaCorreta)
            {
                return Unauthorized(false);
            }

            return Ok(true);
        }


        [HttpPost("definir-senha")]
        public IActionResult DefinirSenha([FromBody] DefinirSenhaRequest request)
        {
            if (string.IsNullOrEmpty(request.Senha))
            {
                return Unauthorized(false);
            }

            var solicitante = _solicitanteService.GetSolicitanteByName(request.Nome);

            if (solicitante == null)
            {
                return NotFound(false);
            }

            return Ok(_solicitanteService.DefinirSenha(solicitante, request.Senha));
        }
    }
}