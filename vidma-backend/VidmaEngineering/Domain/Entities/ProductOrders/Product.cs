using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.ProductOrders;

public class Product
{

    [Key]
    public int Id { get; set; }
    [MaxLength(500)]                    
    public required string ProductName { get; set; }
    public string? ImageUrl { get; set; }

    public string? Color { get; set; }
    
    public string? Material { get; set; }
    
    public string? Thickness { get; set; }
    
    public string? Length { get; set; }
    
    public ICollection<OrderItem>? OrderItems { get; set; }
    
}