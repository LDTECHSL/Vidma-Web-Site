using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Entities.AboutUs;
using Domain.Entities.ContactUs;
using Domain.Entities.Sections;
using Domain.Entities.Services;
using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }


    public DbSet<User> User { get; set; }
    public DbSet<Hero> Hero { get; set; }
    public DbSet<ContactUs> ContactUs { get; set; }
   
    public DbSet<Location> Location { get; set; }
    public DbSet<AboutUsImage> AboutUsImage { get; set; }

    public DbSet<AboutUs> AboutUs { get; set; }
    public DbSet<Service> Service { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new HeroConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsImageConfiguration());
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}