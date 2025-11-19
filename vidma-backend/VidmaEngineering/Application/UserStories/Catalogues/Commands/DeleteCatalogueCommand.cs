using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Catalogues.Commands;

public class DeleteCatalogueCommand : IRequest<Result>
{
    public int Id { get; set; }
}

public class DeleteCatalogueCommandHandler : IRequestHandler<DeleteCatalogueCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteCatalogueCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteCatalogueCommand request, CancellationToken cancellationToken)
    {
        var catalogue = await _context.Catalogue
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        catalogue.ThrowIfNull("Catalogue not found");

        _context.Catalogue.Remove(catalogue);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Catalogue deleted successfully");
    }
}