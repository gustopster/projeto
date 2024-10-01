namespace Projeto.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime? DataColeta { get; set; }
        public string? NumeroIdIpram { get; set; }
        public string? Fai { get; set; }
        public string? Observacoes { get; set; }
    }
}