using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Auth.Commands;

public class LoginCommand : IRequest<TokenResponse>
{
    public string UserName { get; set; }
    public string Password { get; set; }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, TokenResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public LoginCommandHandler(IApplicationDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }


    public async Task<TokenResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.User
            .FirstOrDefaultAsync(u => u.UserName == request.UserName, cancellationToken);

        if (user == null || !VerifyPassword(user.Password, request.Password))
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        var userToken = _jwtService.GenerateToken(user);


        return new TokenResponse
        {
            Token = userToken
        };
    }

    private bool VerifyPassword(string storedHash, string providedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(providedPassword, storedHash);
    }
}

public class TokenResponse
{
    public string Token { get; set; }
}