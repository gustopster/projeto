using System.Security.Cryptography.X509Certificates;

namespace Projeto.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public DateTime? DataColeta { get; set; }
        public string? NumeroIdIpram { get; set; }
        public string? Fai { get; set; }
        public string? Observacoes { get; set; }
        public string? Tumor { get; set; }
        public string? Exames { get; set; }
        public string? Solicitante { get; set; }
    }
}