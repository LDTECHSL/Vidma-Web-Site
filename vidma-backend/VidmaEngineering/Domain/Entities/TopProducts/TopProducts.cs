using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.TopProducts;

public class TopProducts
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public required string Name { get; set; }
    
    [MaxLength(1000)]
    public required string Description { get; set; }

    [MaxLength(500)]
    public required string Colors { get; set; }

    public string? ImageLink { get; set; }

    [MaxLength(100)]
    public required string ProductName { get; set; }
}