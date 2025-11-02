using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Form;

public class Form
{
    [Key] public int Id { get; set; }

    [MaxLength(200)] public required string Name { get; set; }

    [MaxLength(1000)]
    public string? Comment { get; set; }
    
    public string? Reaction { get; set; }

    [RegularExpression(@".+@.+", ErrorMessage = "Email must contain '@'.")]
    public string Email { get; set; }
}