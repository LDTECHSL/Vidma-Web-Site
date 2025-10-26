using System.ComponentModel.DataAnnotations;
using Domain.Entities.Common;

namespace Domain.Entities;

public class User
{
    [Key] public int Id { get; set; }

    [MaxLength(255)] public string UserName { get; set; }

    public string? Password { get; set; }
}