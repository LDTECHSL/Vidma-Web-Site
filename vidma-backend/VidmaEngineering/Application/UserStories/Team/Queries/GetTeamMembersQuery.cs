using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Team.Queries;

public record GetTeamMembersQuery : IRequest<List<TeamResponse>>;

public class GetTeamMembersQueryHandler : IRequestHandler<GetTeamMembersQuery, List<TeamResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetTeamMembersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<TeamResponse>> Handle(GetTeamMembersQuery request, CancellationToken cancellationToken)
    {
        var teamMembers = await _context.Team
            .Select(tm => new TeamResponse
            {
                Id = tm.Id,
                Name = tm.Name,
                Position = tm.Position,
                ImageUrl = tm.ImageUrl
            })
            .ToListAsync(cancellationToken);

        return teamMembers;
    }
}

public class TeamResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? Position { get; set; }

    public required string ImageUrl { get; set; }
}