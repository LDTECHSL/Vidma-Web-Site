using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.ProductOrders;

public class OrderItem
{
    [Key]
    public int Id { get; set; }

    // FK to Product
    public int ProductId { get; set; }
    public Product? Product { get; set; }

    // Quantity for that product
    public int Quantity { get; set; }

    public string Color { get; set; }
    
    public string? Material { get; set; }
    
    public string? Thickness { get; set; }
    
    public string? Length { get; set; }

    // FK to Customer
    public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
}