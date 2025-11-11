using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.User;

public record UserListQuery : IRequest<List<UserResponse>>;

public class UserListQueryHandler : IRequestHandler<UserListQuery, List<UserResponse>>
{
    private readonly IApplicationDbContext _context;

    public UserListQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<List<UserResponse>> Handle(UserListQuery request, CancellationToken cancellationToken)
    {
        var users = await _context.User
            .Select(x => new UserResponse
            {
                Id = x.Id,
                UserName = x.UserName
            })
            .ToListAsync(cancellationToken);


        // Implementation to retrieve user list goes here.
        return users;
    }
}

public class UserResponse
{
    public int Id { get; set; }

    public string UserName { get; set; }
}