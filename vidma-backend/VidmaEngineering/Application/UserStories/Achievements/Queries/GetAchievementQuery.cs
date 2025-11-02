using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Achievements.Queries;

public record GetAchievementQuery : IRequest<List<AchievementResponse>>;


public class GetAchievementQueryHandler : IRequestHandler<GetAchievementQuery, List<AchievementResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetAchievementQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<AchievementResponse>> Handle(GetAchievementQuery request, CancellationToken cancellationToken)
    {
        var achievements = await _context.Achievements.Select(a => new AchievementResponse
        {
            Id = a.Id,
            Name = a.Name,
            Year = a.Year,
            ImageUrl = a.ImageUrl
        }).ToListAsync(cancellationToken);

        return achievements;
    }
}

public class AchievementResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }
    
    public int? Year { get; set; }

    public required string ImageUrl { get; set; }
}