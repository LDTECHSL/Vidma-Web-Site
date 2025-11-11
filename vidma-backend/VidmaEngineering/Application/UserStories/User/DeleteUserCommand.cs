using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.User;

public class DeleteUserCommand : IRequest<Result>
{
    public int Id { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteUserCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.User
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        user.ThrowIfNull("user not found.");

        _context.User.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("User deleted successfully.");
    }
}