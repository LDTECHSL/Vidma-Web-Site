using Domain.Entities.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    
    
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.ToTable("Service");
        
        builder.HasKey(x => x.Id);
        
        // Descriptions: required and limited to 400 chars (matches entity attributes)
        builder.Property(x => x.EnglishDesc)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(x => x.TamilDesc)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(x => x.SinhalaDesc)
            .IsRequired()
            .HasMaxLength(1000);
        
        builder.HasCheckConstraint(
            "CK_Service_Name_AllowedValues",
            "ImageNumber IN ('Service1','Service2','Service3','Service4','Service5','Service6')");
        
        builder.HasData(
            new Service
            {
                Id = 1,
                EnglishDesc = "Description1",
                TamilDesc = "Description1",
                SinhalaDesc = "Description1",
                ServiceName = "Service1",
                EnglishTitle = "EnTitle1",
                SinhalaTitle = "SiTitle1",
                TamilTitle = "TaTitle1"
            },
            new Service
            {
                Id = 2,
                EnglishDesc = "Description2",
                TamilDesc = "Description2",
                SinhalaDesc = "Description2",
                ServiceName = "Service2",
                EnglishTitle = "EnTitle1",
                SinhalaTitle = "SiTitle1",
                TamilTitle = "TaTitle1"
            },
            new Service
            {
                Id = 3,
                EnglishDesc = "Description3",
                TamilDesc = "Description3",
                SinhalaDesc = "Description3",
                ServiceName = "Service3",
                EnglishTitle = "Title1",
                SinhalaTitle = "Title1",
                TamilTitle = "Title1"
            },
            new Service
            {
                Id = 4,
                EnglishDesc = "Description4",
                TamilDesc = "Description4",
                SinhalaDesc = "Description4",
                ServiceName = "Service4",
                EnglishTitle = "Title1",
                SinhalaTitle = "Title1",
                TamilTitle = "Title1"
            },
            new Service
            {
                Id = 5,
                EnglishDesc = "Description5",
                TamilDesc = "Description5",
                SinhalaDesc = "Description5",
                ServiceName = "Service5",
                EnglishTitle = "Title1",
                SinhalaTitle = "Title1",
                TamilTitle = "Title1"
            },
            new Service
            {
                Id = 6,
                EnglishDesc = "Description5",
                TamilDesc = "Description5",
                SinhalaDesc = "Description5",
                ServiceName = "Service6",
                EnglishTitle = "Title1",
                SinhalaTitle = "Title1",
                TamilTitle = "Title1"
            }
        );

    }
}