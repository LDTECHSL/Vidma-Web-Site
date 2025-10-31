using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Stats.Queries;

public record GetStatsQuery : IRequest<StatResponse>;

public class GetStatsQueryHandler : IRequestHandler<GetStatsQuery, StatResponse>
{
    private readonly IApplicationDbContext _context;

    public GetStatsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<StatResponse> Handle(GetStatsQuery request, CancellationToken cancellationToken)
    {
        var stats = await _context.Stats
            .Select(s => new StatResponse
            {
                Id = s.Id,
                Experience = s.Experience,
                Dealers = s.Dealers,
                Projects = s.Projects,
                Points = s.Points
            })
            .FirstOrDefaultAsync(cancellationToken);

        return stats ?? new StatResponse();
    }
}

public class StatResponse
{
    public int Id { get; set; }

    public int Experience { get; set; } = 0;

    public int Dealers { get; set; } = 0;

    public int Projects { get; set; } = 0;

    public int Points { get; set; } = 0;
}