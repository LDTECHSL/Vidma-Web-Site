using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Stats;

public class Stats
{
    [Key]
    public int Id { get; set; } 

    public int Experience { get; set; } = 0;

    public int Dealers { get; set; } = 0;
    
    public int Projects { get; set; } = 0;
    
    public int Points { get; set; } = 0;
}