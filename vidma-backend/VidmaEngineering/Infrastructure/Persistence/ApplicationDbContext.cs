using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Entities.AboutUs;
using Domain.Entities.Achievemnets;
using Domain.Entities.ContactUs;
using Domain.Entities.Form;
using Domain.Entities.Gallery;
using Domain.Entities.ProductOrders;
using Domain.Entities.Sections;
using Domain.Entities.Services;
using Domain.Entities.Stats;
using Domain.Entities.Teams;
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
    public DbSet<Stats> Stats { get; set; }
    public DbSet<Gallery> Gallery { get; set; }
    public DbSet<GalleryImages> GalleryImages { get; set; }
    public DbSet<Team> Team { get; set; }
    public DbSet<Achievements> Achievements { get; set; }
    public DbSet<Form> Form { get; set; }
    public DbSet<OrderItem> OrderItem { get; set; }
    public DbSet<Product> Product { get; set; }
    public DbSet<Customer> Customer { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new HeroConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsImageConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceConfiguration());
        modelBuilder.ApplyConfiguration(new TopProductsConfiguration());
        
        //Gallery Configuration have one to many relationship with Gallery and GalleryImages
        // Configure one-to-many relationship with cascade delete: when a Gallery is deleted its GalleryImages are deleted as well
        modelBuilder.Entity<Gallery>()
            .HasMany(g => g.Images)
            .WithOne(i => i.Gallery)
            .HasForeignKey(i => i.GalleryId)
            .OnDelete(DeleteBehavior.Cascade);
        
        
        // Product configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.ProductName)
                .IsRequired()
                .HasMaxLength(500);
            entity.Property(p => p.Description)
                .HasMaxLength(1000);

            entity.HasMany(p => p.OrderItems)
                .WithOne(oi => oi.Product)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        // Customer configuration
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(c => c.Id); // requires adding Id to Customer class
            entity.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(200);
            entity.Property(c => c.Email)
                .HasMaxLength(320);
            entity.Property(c => c.PhoneNo)
                .HasMaxLength(50);
            entity.Property(c => c.Address)
                .HasMaxLength(1000);


            entity.HasMany(c => c.OrderItems)
                .WithOne(oi => oi.Customer)
                .HasForeignKey(oi => oi.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
        });


        // OrderItem configuration
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(oi => oi.Id);
            entity.Property(oi => oi.Quantity)
                .IsRequired()
                .HasDefaultValue(1);
            entity.HasIndex(oi => new { oi.CustomerId, oi.ProductId })
                .IsUnique(false);
        });
        
        
        
        
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}