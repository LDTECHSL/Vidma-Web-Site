using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Achievements.Commands;

public class UpdateAchievementCommand : IRequest<Result>
{
    public int AchievementId { get; set; }
    
    
    [MaxLength(300)] public required string Name { get; set; }

    public int? Year { get; set; }

    public IFormFile? Image { get; set; }
    
}


public class UpdateAchievementCommandHandler : IRequestHandler<UpdateAchievementCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public UpdateAchievementCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(UpdateAchievementCommand request, CancellationToken cancellationToken)
    {
        var achievement = await _context.Achievements
            .Where(x=> x.Id == request.AchievementId)
            .FirstOrDefaultAsync(cancellationToken);
       
        
        achievement.ThrowIfNull("Achievement not found.");

        achievement.Name = request.Name;
        achievement.Year = request.Year;

        if (request.Image != null)
        {
            var imageUrl = await _dropBoxService.UploadImageAsync(request.Image, "achievements");
            achievement.ImageUrl = imageUrl;
        }

        _context.Achievements.Update(achievement);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Achievement updated successfully.");
    }
}