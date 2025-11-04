using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.ProductOrders;

public class Customer
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }

    public string? Email { get; set; }

    public string? PhoneNo { get; set; }

    public string? Address { get; set; }

    public List<OrderItem>? OrderItems { get; set; }
    
    public DateTime OrderedTime { get; set; }
}