using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities.VideoSection.Videos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.VideoSection.Video.Commands;

public class CreateVideoCommand : IRequest<Result>
{
    public required string Video { get; set; }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateVideoCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        await _context.Videos.AddAsync(new Videos
        {
             VideoLink = request.Video
        }, cancellationToken);
        
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success("Video created successfully");
    }
}