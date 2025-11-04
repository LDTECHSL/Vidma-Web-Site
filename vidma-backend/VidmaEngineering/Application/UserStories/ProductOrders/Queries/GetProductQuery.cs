using Application.Common.Interfaces;
using Domain.Entities.ProductOrders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Queries;

public record GetProductQuery : IRequest<List<Products>>;


public class GetProductQueryHandler : IRequestHandler<GetProductQuery, List<Products>>
{
    private readonly IApplicationDbContext _context;

    public GetProductQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<List<Products>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await _context.Product
            .Select(p => new Products
            {
                Id = p.Id,
                ProductName = p.ProductName,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Color = p.Color
            })
            .ToListAsync(cancellationToken);

        return product;
    }
}