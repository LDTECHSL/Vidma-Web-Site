using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.VideoSection.VideoHeading;

public class VideoHeading
{
    [Key]
    public int Id { get; set; }

    [MaxLength(1000)]
    public required string EnglishDesc { get; set; }
    
    [MaxLength(1000)]
    public required string SinhalaDesc { get; set; }
    
    [MaxLength(1000)]
    public required string TamilDesc { get; set; }
}