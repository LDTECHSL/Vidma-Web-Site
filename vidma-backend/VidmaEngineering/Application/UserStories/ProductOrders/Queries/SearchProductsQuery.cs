using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Queries;

public class SearchProductsQuery : IRequest<List<Products>>
{
    // initialize to avoid analyzer saying setter is never used
    public string Query { get; set; } = string.Empty;
}


public class SearchProductsQueryHandler : IRequestHandler<SearchProductsQuery, List<Products>>
{
    private readonly IApplicationDbContext _context;

    public SearchProductsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Products>> Handle(SearchProductsQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Query))
        {
            return new List<Products>();
        }

        var lowerQuery = request.Query.Trim().ToLowerInvariant();

        var products = await _context.Product
            .Where(p => p.ProductName.ToLower().Contains(lowerQuery)
                        || (p.Description != null && p.Description.ToLower().Contains(lowerQuery)))
            .Select(p => new Products
            {
                ProductName = p.ProductName,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Color = p.Color
            })
            .ToListAsync(cancellationToken);

        return products;
    }
}