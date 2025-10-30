using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Entities.AboutUs;
using Domain.Entities.ContactUs;
using Domain.Entities.Sections;
using Domain.Entities.Services;
using Domain.Entities.TopProducts;
using Domain.Entities.VideoSection.VideoHeading;
using Domain.Entities.VideoSection.Videos;
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
    public DbSet<TopProducts> TopProducts { get; set; }
    
    public DbSet<VideoHeading> VideoHeading { get; set; }
    public DbSet<Videos> Videos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new HeroConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsImageConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceConfiguration());
        modelBuilder.ApplyConfiguration(new TopProductsConfiguration());
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}