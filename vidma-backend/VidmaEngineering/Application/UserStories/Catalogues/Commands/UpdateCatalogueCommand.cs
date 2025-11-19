using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Catalogues.Commands;

public class UpdateCatalogueCommand : IRequest<Result>
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public IFormFile? Catalogue { get; set; }
}

public class UpdateCatalogueCommandHandler : IRequestHandler<UpdateCatalogueCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public UpdateCatalogueCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(UpdateCatalogueCommand request, CancellationToken cancellationToken)
    {
        var catalogue = await _context.Catalogue
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        catalogue.ThrowIfNull("Catalogue not found");

        if (!string.IsNullOrEmpty(request.Name))
        {
            catalogue.Name = request.Name;
        }

        if (!string.IsNullOrEmpty(request.Description))
        {
            catalogue.Type = request.Description;
        }

        if (request.Catalogue != null)
        {
            await using var ms = new MemoryStream();
            await request.Catalogue.CopyToAsync(ms, cancellationToken);
            catalogue.CatalogueFile = ms.ToArray();
        }

        _context.Catalogue.Update(catalogue);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Catalogue updated successfully");
    }
}