using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class InfrastructureDependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(
                configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection"))));

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        
         services.AddScoped<IJwtService, JwtService>();
        // services.AddScoped<ICurrentUserService, CurrentUserService>();
        // services.AddSingleton<IImageUploadService, ImageUploadService>();
        // services.AddSingleton<IChatService, ChatService>();
        // services.AddSingleton<IPdfService, PdfService>();
        
        
        return services;
    }
}