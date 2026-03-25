using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Commands;

public class DeleteOrderCommand : IRequest<Result>
{
    public int CustomerId { get; set; }
}

public class DeleteOrderCommandHandler(IApplicationDbContext context) : IRequestHandler<DeleteOrderCommand, Result>
{
    public async Task<Result> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var orderItems = context.OrderItem.Where(oi => oi.CustomerId == request.CustomerId);
        context.OrderItem.RemoveRange(orderItems);
        
        var customer = await context.Customer.Where(c => c.Id == request.CustomerId).FirstOrDefaultAsync(cancellationToken);
        
        if (customer == null)
        {
            return Result.Failure("Customer not found.");
        }
        
        context.Customer.Remove(customer);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success("Order deleted successfully.");
    }
}