using Domain.Entities.AboutUs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class AboutUsImageConfiguration : IEntityTypeConfiguration<AboutUsImage>
{
    public void Configure(EntityTypeBuilder<AboutUsImage> builder)
    {
        // Configure table
        builder.ToTable("AboutUsImage");

        builder.HasKey(x => x.Id);

        // Image: required, reasonably sized, unique and limited to 5 allowed values
        builder.Property(x => x.ImageNumber)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasIndex(x => x.ImageNumber).IsUnique();

        // ImageLink: required and limited length (adjust as needed)
        builder.Property(x => x.ImageLink)
            .IsRequired()
            .HasMaxLength(2048);

        // Descriptions: required and limited to 400 chars (matches entity attributes)
        builder.Property(x => x.EnglishDesc)
            .IsRequired()
            .HasMaxLength(400);

        builder.Property(x => x.TamilDesc)
            .IsRequired()
            .HasMaxLength(400);

        builder.Property(x => x.SinhalaDesc)
            .IsRequired()
            .HasMaxLength(400);

        // Enforce allowed Image values (this will restrict values to Image1..Image5).
        // Use provider-agnostic column name (MySQL prefers unquoted column names here in raw SQL expression)
        builder.HasCheckConstraint(
            "CK_AboutUsImage_Image_AllowedValues",
            "ImageNumber IN ('Image1','Image2','Image3','Image4','Image5')");

        // Optional: seed five entries (one per allowed Image value).
        // This ensures the DB has exactly five slots available (Image1..Image5). Remove or adjust seed data if you don't want initial rows.
        builder.HasData(
            new AboutUsImage { Id = 1, ImageNumber = "Image1", ImageLink = "link1", EnglishDesc = "Description1", TamilDesc = "Description1", SinhalaDesc = "Description1" },
            new AboutUsImage { Id = 2, ImageNumber = "Image2", ImageLink = "link2", EnglishDesc = "Description2", TamilDesc = "Description2", SinhalaDesc = "Description2" },
            new AboutUsImage { Id = 3, ImageNumber = "Image3", ImageLink = "link3", EnglishDesc = "Description3", TamilDesc = "Description3", SinhalaDesc = "Description3" },
            new AboutUsImage { Id = 4, ImageNumber = "Image4", ImageLink = "link4", EnglishDesc = "Description4", TamilDesc = "Description4", SinhalaDesc = "Description4" },
            new AboutUsImage { Id = 5, ImageNumber = "Image5", ImageLink = "link5", EnglishDesc = "Description5", TamilDesc = "Description5", SinhalaDesc = "Description5" }
        );
    }
}