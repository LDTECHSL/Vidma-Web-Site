using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.AboutUs;

public class AboutUs
{
    [Key]
    public int Id { get; set; }

    [MaxLength(300)]
    public required string EnglishDesc { get; set; }
    
    [MaxLength(300)]
    public required string SinhalaDesc { get; set; }
    
    [MaxLength(300)]
    public required string TamilDesc { get; set; }
}