using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Teams;

public class Team
{
    [Key]
    public int Id { get; set; }

    [MaxLength(300)]
    public required string Name { get; set; }
    
    [MaxLength(500)]
    public string? Position { get; set; }

    public required string ImageUrl { get; set; }
    
}