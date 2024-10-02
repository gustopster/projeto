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
                entity.ToTable("Animals");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.DataColeta)
                    .HasColumnName("data_coleta")
                    .HasColumnType("DATE");

                entity.Property(e => e.NumeroIdIpram)
                    .HasColumnName("numero_id_ipram")
                    .HasColumnType("TEXT");

                entity.Property(e => e.Fai)
                    .HasColumnName("fai")
                    .HasMaxLength(16);

                entity.Property(e => e.Observacoes)
                    .HasColumnName("observacoes")
                    .HasColumnType("TEXT")
                    .IsRequired(false); // Observações também podem ser opcionais
            });
        }
    }
}