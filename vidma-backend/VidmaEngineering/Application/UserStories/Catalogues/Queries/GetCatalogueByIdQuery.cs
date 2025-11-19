using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Catalogues.Queries;

public class GetCatalogueByIdQuery : IRequest<CatalogueResponse>
{
    public int CatalogueId { get; set; }
}

public class GetCatalogueByIdQueryHandler : IRequestHandler<GetCatalogueByIdQuery, CatalogueResponse>
{
    private readonly IApplicationDbContext _context;

    public GetCatalogueByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<CatalogueResponse> Handle(GetCatalogueByIdQuery request, CancellationToken cancellationToken)
    {
        var catalogue = await _context.Catalogue
            .Where(x=> x.Id == request.CatalogueId)
            .FirstOrDefaultAsync(cancellationToken);

        catalogue.ThrowIfNull("Catalogue not found");
        
        var response = new CatalogueResponse
        {
            Id = catalogue.Id,
            Name = catalogue.Name,
            Type = catalogue.Type,
            CatalogueFile = catalogue.CatalogueFile
        };

        return response;
        
    }
}