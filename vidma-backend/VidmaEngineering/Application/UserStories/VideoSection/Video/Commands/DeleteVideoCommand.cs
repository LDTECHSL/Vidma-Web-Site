using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.VideoSection.Video.Commands;

public class DeleteVideoCommand : IRequest<Result>
{
    public int Id { get; set; }
}

public class DeleteVideoCommandHandler : IRequestHandler<DeleteVideoCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteVideoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteVideoCommand request, CancellationToken cancellationToken)
    {
        var video = await _context.Videos
            .Where(x=>x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);
       
        video.ThrowIfNull("Video not found.");

        _context.Videos.Remove(video);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Video deleted successfully.");
    }
}