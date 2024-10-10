using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Repositories;
using Projeto.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DbContext para usar MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

// Configuração do CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CustomCorsPolicy", builder =>
    {
        builder.WithOrigins(allowedOrigins)
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registro de repositórios
builder.Services.AddScoped<IAnimalRepository, AnimalRepository>();
builder.Services.AddScoped<ISolicitanteRepository, SolicitanteRepository>();
builder.Services.AddScoped<IExameRepository, ExameRepository>();
builder.Services.AddScoped<IEspeciesRepository, EspeciesRepository>();  // Adicionando o repositório de espécies

// Registro de serviços
builder.Services.AddScoped<AnimalService>();
builder.Services.AddScoped<SolicitanteService>();
builder.Services.AddScoped<ExameService>();
builder.Services.AddScoped<EspecieService>();  // Adicionando o serviço de espécies

var app = builder.Build();

// Middleware do Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// Aplicação do CORS
app.UseCors("CustomCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();