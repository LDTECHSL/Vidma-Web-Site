using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.VideoSection.Videos;

public class Videos
{
    [Key] public int Id { get; set; }

    public required string VideoLink { get; set; }
}