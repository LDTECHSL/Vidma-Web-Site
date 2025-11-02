using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Achievemnets;

public class Achievements
{
    [Key]
    public int Id { get; set; }

    [MaxLength(300)]
    public required string Name { get; set; }
    
    public int? Year { get; set; }

    public required string ImageUrl { get; set; }
}