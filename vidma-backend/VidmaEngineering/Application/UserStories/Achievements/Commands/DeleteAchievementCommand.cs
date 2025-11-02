using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Achievements.Commands;

public class DeleteAchievementCommand : IRequest<Result>
{
    public int AchievementId { get; set; }
}


public class DeleteAchievementCommandHandler : IRequestHandler<DeleteAchievementCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteAchievementCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteAchievementCommand request, CancellationToken cancellationToken)
    {
        var achievement = await _context.Achievements
            .Where(x=> x.Id == request.AchievementId)
            .FirstOrDefaultAsync(cancellationToken);

        achievement.ThrowIfNull("Achievement not found.");

        _context.Achievements.Remove(achievement);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Achievement deleted successfully.");
    }
}