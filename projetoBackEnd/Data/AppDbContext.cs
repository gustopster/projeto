using Microsoft.EntityFrameworkCore;
using Projeto.Models;

namespace Projeto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Animal> Animals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                // Define a tabela e o esquema "projeto_nath"
                entity.ToTable("Animals", "projeto_nath");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.DataColeta)
                    .HasColumnName("DataColeta")
                    .HasColumnType("DATE");

                entity.Property(e => e.NumeroIdIpram)
                    .HasColumnName("NumeroIdIpram")
                    .HasColumnType("TEXT");

                entity.Property(e => e.Fai)
                    .HasColumnName("Fai")
                    .HasMaxLength(16);

                entity.Property(e => e.Tumor)
                    .HasColumnName("Tumor")
                    .HasColumnType("TEXT");

                entity.Property(e => e.Exames)
                    .HasColumnName("Exames")
                    .HasColumnType("TEXT");

                entity.Property(e => e.Solicitante)
                    .HasColumnName("Solicitante")
                    .HasColumnType("TEXT");

                entity.Property(e => e.Observacoes)
                    .HasColumnName("Observacoes")
                    .HasColumnType("TEXT")
                    .IsRequired(false);
            });
        }
    }
}