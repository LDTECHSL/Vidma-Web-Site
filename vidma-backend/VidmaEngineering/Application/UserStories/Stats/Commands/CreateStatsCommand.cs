using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Stats.Commands;

public class CreateStatsCommand : IRequest<Result>
{

    public int Experience { get; set; } = 0;

    public int Dealers { get; set; } = 0;

    public int Projects { get; set; } = 0;

    public int Points { get; set; } = 0;
}

public class CreateStatsCommandHandler : IRequestHandler<CreateStatsCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateStatsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<Result> Handle(CreateStatsCommand request, CancellationToken cancellationToken)
    {

        var existingStats = await _context.Stats.FirstOrDefaultAsync(cancellationToken);
        if (existingStats != null)
        {
            _context.Stats.Remove(existingStats);
            await _context.SaveChangesAsync(cancellationToken);
        }
       
        
        var stats = new Domain.Entities.Stats.Stats
        {
            Experience = request.Experience,
            Dealers = request.Dealers,
            Projects = request.Projects,
            Points = request.Points
        };

        _context.Stats.Add(stats);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Stats created successfully.");
    }
}