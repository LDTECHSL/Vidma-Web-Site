using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Auth.Commands;

public class RegistrationCommand : IRequest<Result>
{
    public required RegistrationResponse RegistrationResponse { get; set; }
}

public class RegistrationCommandHandler : IRequestHandler<RegistrationCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public RegistrationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(RegistrationCommand request, CancellationToken cancellationToken)
    {
        var det = request.RegistrationResponse;

        var existingEmailInUser = await _context.User
            .FirstOrDefaultAsync(x => x.UserName == det.UserName, cancellationToken);

        if (existingEmailInUser != null)
        {
            throw new InvalidOperationException("UserName already exists.");
        }


        // Fetch the actual User entity for update
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(det.Password);

        var user = new Domain.Entities.User
        {
            UserName = det.UserName,
            Password = encryptedPassword,
        };

        _context.User.Add(user);
        await _context.SaveChangesAsync(cancellationToken);


        return Result.Success("Registration completed");
    }
}

public class RegistrationResponse
{
    public required string UserName { get; set; }

    public required string Password { get; set; }
}