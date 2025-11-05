using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Queries;

public record GetCustomerOrdersQuery : IRequest<List<CustomerOrders>>;


public class GetCustomerOrdersQueryHandler : IRequestHandler<GetCustomerOrdersQuery, List<CustomerOrders>>
{
    private readonly IApplicationDbContext _context;

    public GetCustomerOrdersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<CustomerOrders>> Handle(GetCustomerOrdersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _context.Customer
            .Select(c => new CustomerOrders
            {
                CustomerId = c.Id,
                CustomerName = c.Name,
                OrderedTime = c.OrderedTime,
                OrderItems = c.OrderItems == null
                    ? new List<OrderItemDetails>()
                    : c.OrderItems
                        .Select(oi => new OrderItemDetails
                        {
                            OrderItemId = oi.Id,
                            ProductName = oi.Product != null ? oi.Product.ProductName : string.Empty,
                            Quantity = oi.Quantity,
                            Color = oi.Color
                        })
                        .ToList()
            })
            .ToListAsync(cancellationToken);

        return customers;
    }
}

public class CustomerOrders
{
    public int CustomerId { get; set; }
    
    public string CustomerName { get; set; } = string.Empty;

    public DateTime OrderedTime { get; set; }
    
    public List<OrderItemDetails> OrderItems { get; set; } = new List<OrderItemDetails>();
}

public class OrderItemDetails
{
    public int OrderItemId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }


    public string? Color { get; set; }

}