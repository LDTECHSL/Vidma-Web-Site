using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.User;

public class ResetPasswordCommand : IRequest<string>
{
    public required string UserName { get; set; }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, string>
{
    private readonly IApplicationDbContext _context;

    public ResetPasswordCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var users = await _context.User
            .Where(u => u.UserName.ToLower() == request.UserName.ToLower())
            .FirstOrDefaultAsync(cancellationToken);

        users.ThrowIfNull("user cant found");

        //new random 4 characters password
        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var newPassword = new string(Enumerable.Repeat(chars, 4)
            .Select(s => s[random.Next(s.Length)]).ToArray());


        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

        users.Password = encryptedPassword;
        _context.User.Update(users);
        await _context.SaveChangesAsync(cancellationToken);


        return newPassword;
    }
}