using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Gallery;

public class Gallery
{
    [Key]
    public int Id { get; set; }
    
    public string Title { get; set; } = string.Empty;
    
    public ICollection<GalleryImages> Images { get; set; } = new List<GalleryImages>();
}