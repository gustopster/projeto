using Microsoft.EntityFrameworkCore;
using Projeto.Models;

namespace Projeto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Animal> Animals { get; set; }
        public DbSet<Exame> Exames { get; set; }
        public DbSet<Solicitante> Solicitantes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Mapeamento da entidade Animal
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.ToTable("Animals", "projeto_nath");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DataColeta).HasColumnName("DataColeta").HasColumnType("DATE");
                entity.Property(e => e.NumeroIdIpram).HasColumnName("NumeroIdIpram").HasColumnType("TEXT");
                entity.Property(e => e.Fai).HasColumnName("Fai").HasMaxLength(16);
                entity.Property(e => e.Tumor).HasColumnName("Tumor").HasColumnType("TEXT");
                entity.Property(e => e.Exames).HasColumnName("Exames").HasColumnType("TEXT");
                entity.Property(e => e.Solicitante).HasColumnName("Solicitante").HasColumnType("TEXT");
                entity.Property(e => e.Observacoes).HasColumnName("Observacoes").HasColumnType("TEXT").IsRequired(false);
            });

            // Mapeamento da entidade Exame
            modelBuilder.Entity<Exame>(entity =>
            {
                entity.ToTable("Exames", "projeto_nath");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).HasColumnName("Nome").HasColumnType("TEXT");
            });

            // Mapeamento da entidade Solicitante
            modelBuilder.Entity<Solicitante>(entity =>
            {
                entity.ToTable("Solicitantes", "projeto_nath");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).HasColumnName("Nome").HasColumnType("TEXT");
                entity.Property(e => e.Permissao).HasColumnName("Permissao").HasColumnType("TEXT");
                entity.Property(e => e.Senha).HasColumnName("Senha").HasColumnType("TEXT");
            });
        }
    }
}