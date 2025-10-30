using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Services;

public class Service
{
    [Key]
    public int Id { get; set; }

    [MaxLength(50)]
    public required string ServiceName { get; set; }

    [MaxLength(100)]
    public required string EnglishTitle { get; set; }
    
    [MaxLength(100)]
    public required string SinhalaTitle { get; set; }
    
    [MaxLength(100)]
    public required string TamilTitle { get; set; }
    
    [MaxLength(1000)]
    public required string EnglishDesc { get; set; }
    
    [MaxLength(1000)]
    public required string SinhalaDesc { get; set; }
    
    [MaxLength(1000)]
    public required string TamilDesc { get; set; }
}