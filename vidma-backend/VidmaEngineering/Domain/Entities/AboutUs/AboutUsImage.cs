using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.AboutUs;

public class AboutUsImage
{
    [Key]
    public int Id { get; set; }

    public required string ImageNumber { get; set; } = "Image1";

    public required string ImageLink { get; set; }
    
    [MaxLength(400)]
    public required string EnglishDesc { get; set; } = "Description1";
    
    [MaxLength(400)]
    public required string TamilDesc { get; set; } = "Description1";
    
    [MaxLength(400)]
    public required string SinhalaDesc { get; set; } = "Description1";
}