using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Gallery;

public class GalleryImages
{
    [Key]
    public int Id { get; set; }
    
    public int GalleryId { get; set; }
    
    public string ImageUrl { get; set; } = string.Empty;
    
    public Gallery Gallery { get; set; } = null!;
}