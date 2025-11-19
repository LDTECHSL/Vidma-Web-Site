using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.Catalogues.Commands;

public class CreateCatalogueCommand : IRequest<Result>
{
    public required string Name { get; set; }

    public string? Description { get; set; }

    public IFormFile? Catalogue { get; set; }
}

public class CreateCatalogueCommandHandler : IRequestHandler<CreateCatalogueCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateCatalogueCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateCatalogueCommand request, CancellationToken cancellationToken)
    {
        //convert IFormFile to byte array
        byte[]? fileBytes = null;
        if (request.Catalogue != null)
        {
            await using var ms = new MemoryStream();
            await request.Catalogue.CopyToAsync(ms, cancellationToken);
            fileBytes = ms.ToArray();
        }

        var catalogue = new Domain.Entities.Catalogues.Catalogue
        {
            Name = request.Name,
            Type = request.Description ?? string.Empty,
            CatalogueFile = fileBytes,
        };
        
        _context.Catalogue.Add(catalogue);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Catalogue created successfully");
    }
}