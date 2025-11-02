using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.Achievements.Commands;

public class CreateAchievementCommand : IRequest<Result>
{
    [MaxLength(300)] public required string Name { get; set; }

    public int? Year { get; set; }

    public IFormFile ImageUrl { get; set; }
}

public class CreateAchievementCommandHandler : IRequestHandler<CreateAchievementCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateAchievementCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateAchievementCommand request, CancellationToken cancellationToken)
    {
        var imageLink = await _dropBoxService.UploadImageAsync(request.ImageUrl, "achievements");


        var achievement = new Domain.Entities.Achievemnets.Achievements
        {
            Name = request.Name,
            Year = request.Year,
            ImageUrl = imageLink
        };

        _context.Achievements.Add(achievement);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Achievement created successfully.");
    }
}