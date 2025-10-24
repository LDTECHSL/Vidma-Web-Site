using System.ComponentModel.DataAnnotations;
using Domain.Entities.Common;
using Microsoft.AspNetCore.Http;

namespace Domain.Entities.Sections;

public class Hero : AuditableEntity
{
    public required FirstHero FirstHero { get; set; } 

    public required SecondHero SecondHero { get; set; } 

    public required ThirdHero ThirdHero { get; set; } 
}

// Make these concrete so EF Core can map them as owned types
public class FirstHero : HeroContent { }

public class SecondHero : HeroContent { }

public class ThirdHero : HeroContent { }

public abstract class HeroContent
{
    public LocalizedContent English { get; set; } = new();

    public LocalizedContent Sinhala { get; set; } = new();

    public LocalizedContent Tamil { get; set; } = new();

    public string? Image { get; set; }
}

public class LocalizedContent
{
    [MaxLength] public string Title { get; set; } = string.Empty;

    [MaxLength(500)] public string? Text { get; set; }
}