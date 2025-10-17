using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Entities.Common;

public class AuditableEntity : BaseEntity
{
    [MaxLength(150)]
    public string? CreatedBy { get; set; }
    public DateTime? CreatedAt { get; set; }
    
    [MaxLength(150)]
    public string? ModifiedBy { get; set; }
    public DateTime? ModifiedAt { get; set; }
}