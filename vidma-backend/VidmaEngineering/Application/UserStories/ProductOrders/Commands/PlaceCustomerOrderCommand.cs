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
    private readonly IEmailService _emailService;

    public PlaceCustomerOrderCommandCommandHandler(IApplicationDbContext context, IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    public async Task<Result> Handle(PlaceCustomerOrderCommand request, CancellationToken cancellationToken)
    {
        var cd = request.CustomerDetails;
        var requestedItems = cd.OrderItems?.Where(oi => oi.Quantity > 0).ToList() ?? new List<OrderItems>();

        if (string.IsNullOrWhiteSpace(cd.FirstName) && string.IsNullOrWhiteSpace(cd.LastName))
            return Result.Failure("Customer name is required.");

        if (!requestedItems.Any())
            return Result.Failure("At least one order item must be provided.");

        var productIds = requestedItems.Select(g => g.ProductId).Distinct().ToList();
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

        var items = requestedItems.Select(oi => new OrderItem
        {
            ProductId = oi.ProductId,
            Quantity = oi.Quantity,
            Color = oi.Color ?? string.Empty,
            Material = oi.Material,
            Thickness = oi.Thickness,
            Length = oi.Length,
        }).ToList();

        customer.OrderItems = items;

        _context.Customer.Add(customer);

        await _context.SaveChangesAsync(cancellationToken);

        try
        {
            await _emailService.SendOrderConfirmationEmailAsync(customer, items, cancellationToken: cancellationToken);
        }
        catch
        {
            // Email failures should not block order creation; consider logging in the future.
        }

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

    public string? Material { get; set; }
    public string? Thickness { get; set; }
    public string? Length { get; set; }
}