namespace Projeto.Models
{
    public class Solicitante
    {
        public Solicitante(int id, string? nome, string? permissao)
        {
            Id = id;
            Nome = nome;
            Permissao = permissao;
        }

        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Permissao { get; set; }
        public string? Senha { get; set; }
    }
}