using System.ComponentModel.DataAnnotations;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.TopProducts.Queries;

public record GetTopProductsQuery : IRequest<List<TopProductResponse>>;

public class GetTopProductsQueryHandler : IRequestHandler<GetTopProductsQuery, List<TopProductResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetTopProductsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<TopProductResponse>> Handle(GetTopProductsQuery request, CancellationToken cancellationToken)
    {
        var topProducts = await _context.TopProducts
            .Select(tp => new TopProductResponse
            {
                Name = tp.Name,
                Description = tp.Description,
                Colors = tp.Colors,
                ImageLink = tp.ImageLink,
                ProductName = tp.ProductName
            })
            .ToListAsync(cancellationToken);

        return topProducts;
    }
}

public class TopProductResponse
{
    [MaxLength(100)] public required string Name { get; set; }

    [MaxLength(1000)] public required string Description { get; set; }

    [MaxLength(500)] public required string Colors { get; set; }

    public string? ImageLink { get; set; }

    [MaxLength(100)] public required string ProductName { get; set; }
}