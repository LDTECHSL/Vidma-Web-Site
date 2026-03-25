using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities.ProductOrders;

namespace Application.Common.Interfaces;

public interface IEmailService
{
    Task SendProductListEmailAsync();

    Task SendOrderConfirmationEmailAsync(
        Customer customer,
        IEnumerable<OrderItem> orderItems,
        string? logoUrl = null,
        CancellationToken cancellationToken = default);
}