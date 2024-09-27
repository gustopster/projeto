using Projeto.Data;
using Projeto.Interfaces;
using Projeto.Repositories;
using Projeto.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

// Configuração de CORS
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

builder.Services.AddScoped<IAnimalRepository, AnimalRepository>();
builder.Services.AddScoped<AnimalService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("CustomCorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();