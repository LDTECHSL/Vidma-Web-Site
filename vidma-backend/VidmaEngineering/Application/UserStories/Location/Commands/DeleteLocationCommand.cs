using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Location.Commands;

public class DeleteLocationCommand : IRequest<Result>
{
    public int Id { get; set; }
}

public class DeleteLocationCommandHandler(IApplicationDbContext context)
    : IRequestHandler<DeleteLocationCommand, Result>
{
    public async Task<Result> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
    {
        var location = await context.Location
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        location.ThrowIfNull("Location not found.");

        context.Location.Remove(location);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}