using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Catalogues;

public class Catalogue
{
    [Key] public int Id { get; set; }

    [MaxLength(100)] public required string Name { get; set; }

    [MaxLength(1000)] public required string Type { get; set; }

    public byte[]? CatalogueFile { get; set; }
}