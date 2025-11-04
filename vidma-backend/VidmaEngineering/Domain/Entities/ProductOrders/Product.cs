using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.ProductOrders;

public class Product
{

    [Key]
    public int Id { get; set; }
    [MaxLength(500)]                    
    public required string ProductName { get; set; }
    
    [MaxLength(1000)]
    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? Color { get; set; }
    
    public ICollection<OrderItem>? OrderItems { get; set; }
    
}