using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.User;

public class ChangePasswordCommand : IRequest<Result>
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public required string OldPassword { get; set; }

    public required string NewPassword { get; set; }
}

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public ChangePasswordCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _context.User
            .Where(x => x.Id == request.Id && x.UserName == request.UserName)
            .FirstOrDefaultAsync(cancellationToken);

        existingUser.ThrowIfNull("User not found.");

        existingUser.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        _context.User.Update(existingUser);
        await _context.SaveChangesAsync(cancellationToken);


        return Result.Success("Password changed successfully.");
    }
}