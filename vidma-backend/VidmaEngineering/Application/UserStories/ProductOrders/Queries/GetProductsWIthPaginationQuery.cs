using Application.Common.Interfaces;
using Domain.Entities.ProductOrders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Queries;

public class GetProductsWIthPaginationQuery : IRequest<PaginatedProducts>
{
    public int Page { get; set; } 
    
    public int PageSize { get; set; } 
    
}



public class GetProductsWIthPaginationQueryHandler : IRequestHandler<GetProductsWIthPaginationQuery, PaginatedProducts>
{
    private readonly IApplicationDbContext _context;

    public GetProductsWIthPaginationQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<PaginatedProducts> Handle(GetProductsWIthPaginationQuery request, CancellationToken cancellationToken)
    {
        var products = await _context.Product
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(p => new Products
            {
                Id = p.Id,
                ProductName = p.ProductName,
                ImageUrl = p.ImageUrl,
                Color = p.Color,
                Material = p.Material,
                Thickness = p.Thickness,
                Length = p.Length
            })
            .ToListAsync(cancellationToken);

        var result = new PaginatedProducts
        {
            Products = products,
            Page = request.Page,
            PageSize = request.PageSize
        };

        return result;
    }
}

public class Products
{
    public int Id { get; set; }             
    public required string ProductName { get; set; }
    public string? ImageUrl { get; set; }
    public string? Color { get; set; }
    public string? Material { get; set; }
    public string? Thickness { get; set; }
    public string? Length { get; set; }
}

public class PaginatedProducts
{
    public List<Products> Products { get; set; }

    public int Page { get; set; } = 1;
    
    public int PageSize { get; set; } = 10;
}