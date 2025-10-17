using System.ComponentModel.DataAnnotations;
using Domain.Entities.Common;

namespace Domain.Entities;

public class User : AuditableEntity
{
    [MaxLength(255)] public string UserName { get; set; }

    public string? Password { get; set; }
    [MaxLength(255)] public string? Email { get; set; }

    public required string PhoneNo { get; set; }
}