using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.UserStories;
using Domain.Entities.TopProducts;

namespace Infrastructure.Configurations;

public class TopProductsConfiguration : IEntityTypeConfiguration<TopProducts>
{
    public void Configure(EntityTypeBuilder<TopProducts> builder)
    {
        builder.ToTable("TopProducts");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.Description)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(p => p.Colors)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(p => p.ImageLink)
            .HasMaxLength(2000);

        builder.Property(p => p.ProductName)
            .IsRequired()
            .HasMaxLength(50);

        // Restrict ProductName values to Product1..Product10
        builder.HasCheckConstraint(
            "CK_TopProducts_ProductName",
            "ProductName IN ('Product1','Product2','Product3','Product4','Product5','Product6','Product7','Product8','Product9','Product10')"
        );

        // Ensure ProductName is unique so only one row per product name exists
        builder.HasIndex(p => p.ProductName).IsUnique();

        // Seed 10 dummy records (one per allowed ProductName)
        builder.HasData(
            new TopProducts { Id = 1, Name = "Top Product 1", Description = "Dummy description for product 1", Colors = "Red,Blue", ImageLink = null, ProductName = "Product1",Materials = "Material1" },
            new TopProducts { Id = 2, Name = "Top Product 2", Description = "Dummy description for product 2", Colors = "Green,White", ImageLink = null, ProductName = "Product2",Materials = "Material1" },
            new TopProducts { Id = 3, Name = "Top Product 3", Description = "Dummy description for product 3", Colors = "Black,Gray", ImageLink = null, ProductName = "Product3",Materials = "Material1" },
            new TopProducts { Id = 4, Name = "Top Product 4", Description = "Dummy description for product 4", Colors = "Blue,Yellow", ImageLink = null, ProductName = "Product4",Materials = "Material1" },
            new TopProducts { Id = 5, Name = "Top Product 5", Description = "Dummy description for product 5", Colors = "Orange,White", ImageLink = null, ProductName = "Product5",Materials = "Material1" },
            new TopProducts { Id = 6, Name = "Top Product 6", Description = "Dummy description for product 6", Colors = "Purple,Black", ImageLink = null, ProductName = "Product6",Materials = "Material1" },
            new TopProducts { Id = 7, Name = "Top Product 7", Description = "Dummy description for product 7", Colors = "Brown,Beige", ImageLink = null, ProductName = "Product7",Materials = "Material1" },
            new TopProducts { Id = 8, Name = "Top Product 8", Description = "Dummy description for product 8", Colors = "Silver,Gray", ImageLink = null, ProductName = "Product8",Materials = "Material1" },
            new TopProducts { Id = 9, Name = "Top Product 9", Description = "Dummy description for product 9", Colors = "Gold,White", ImageLink = null, ProductName = "Product9",Materials = "Material1" },
            new TopProducts { Id = 10, Name = "Top Product 10", Description = "Dummy description for product 10", Colors = "Teal,Black", ImageLink = null, ProductName = "Product10",Materials = "Material1" }
        );
    }
}