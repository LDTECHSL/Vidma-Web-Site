using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities.ProductOrders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Commands;

public class PlaceCustomerOrderCommand : IRequest<Result>
{
    public required CustomerDetailsRequest CustomerDetails { get; set; }
}

public class PlaceCustomerOrderCommandCommandHandler : IRequestHandler<PlaceCustomerOrderCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public PlaceCustomerOrderCommandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(PlaceCustomerOrderCommand request, CancellationToken cancellationToken)
    {
        if (request == null || request.CustomerDetails == null)
            return Result.Failure("Invalid request payload.");

        var cd = request.CustomerDetails;

        if (string.IsNullOrWhiteSpace(cd.FirstName) && string.IsNullOrWhiteSpace(cd.LastName))
            return Result.Failure("Customer name is required.");

        if (!cd.OrderItems.Any())
            return Result.Failure("At least one order item must be provided.");

        if (cd.OrderItems.Any(oi => oi.Quantity <= 0))
            return Result.Failure("All order items must have a quantity greater than zero.");

        var groupedItems = cd.OrderItems
            .GroupBy(oi => oi.ProductId)
            .Select(g => new { ProductId = g.Key, Quantity = g.Sum(x => x.Quantity) })
            .ToList();

        var productIds = groupedItems.Select(g => g.ProductId).Distinct().ToList();
        var existingProductIds = await _context.Product
            .Where(p => productIds.Contains(p.Id))
            .Select(p => p.Id)
            .ToListAsync(cancellationToken);

        var missing = productIds.Except(existingProductIds).ToList();
        if (missing.Any())
            return Result.Failure($"The following product ids were not found: {string.Join(", ", missing)}");

        var customer = new Customer
        {
            Name = $"{cd.FirstName} {cd.LastName}".Trim(),
            Email = cd.Email,
            PhoneNo = cd.PhoneNumber,
            Address = cd.Address,
            OrderedTime = DateTime.UtcNow,
           
        };

        var items = groupedItems.Select(gi => new OrderItem
        {
            ProductId = gi.ProductId,
            Quantity = gi.Quantity,
            Color = cd.Color 
        }).ToList();

        customer.OrderItems = items;

        _context.Customer.Add(customer);

        await _context.SaveChangesAsync(cancellationToken);

        var result = Result.Success("Order added successfully.");
        result.SetData(new { CustomerId = customer.Id });
        return result;
    }
}


public class CustomerDetailsRequest
{
    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Email { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Address { get; set; }
    
    public required string Color { get; set; }
    
    public List<OrderItems>? OrderItems { get; set; } = new();
}

public class OrderItems
{
    public int ProductId { get; set; }
    
    public string? Color { get; set; }

    public int Quantity { get; set; }
}