using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.VideoSection.VideoHeading.Commands;

public class CreateVideoHeadingCommand : IRequest<Result>
{
    public string EnglishDesc { get; set; }
    public string SinhalaDesc { get; set; }
    public string TamilDesc { get; set; }
}


public class CreateVideoHeadingCommandHandler : IRequestHandler<CreateVideoHeadingCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateVideoHeadingCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateVideoHeadingCommand request, CancellationToken cancellationToken)
    {
        var existingVideoHeading = await _context.VideoHeading.FirstOrDefaultAsync(cancellationToken);
        if (existingVideoHeading != null)
        {
            _context.VideoHeading.Remove(existingVideoHeading);
            await _context.SaveChangesAsync(cancellationToken);
        }
        
        var videoHeading = new Domain.Entities.VideoSection.VideoHeading.VideoHeading
        {
            EnglishDesc = request.EnglishDesc,
            SinhalaDesc = request.SinhalaDesc,
            TamilDesc = request.TamilDesc
        };
        _context.VideoHeading.Add(videoHeading);
        await _context.SaveChangesAsync(cancellationToken);


        return Result.Success("Video Heading created successfully.");
    }
}