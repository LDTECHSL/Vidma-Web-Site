using Application.Common.Interfaces;
using Domain.Entities.Catalogues;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Catalogues.Queries;

public record GetAllCataloguesQuery : IRequest<List<CatalogueResponse>>;

public class GetAllCataloguesQueryHandler : IRequestHandler<GetAllCataloguesQuery, List<CatalogueResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCataloguesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<CatalogueResponse>> Handle(GetAllCataloguesQuery request, CancellationToken cancellationToken)
    {
        var catalogues = await _context.Catalogue.ToListAsync(cancellationToken);

        var response = catalogues.Select(c => new CatalogueResponse
        {
            Id = c.Id,
            Name = c.Name,
            Type = c.Type,
            CatalogueFile = c.CatalogueFile
        }).ToList();

        return response;
    }
}

public class CatalogueResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Type { get; set; }

    public byte[]? CatalogueFile { get; set; }
}