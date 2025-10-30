using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.VideoSection.Video.Queries;

public record GetVideosQuery : IRequest<List<VideoResponse>>;


public class GetVideosQueryHandler : IRequestHandler<GetVideosQuery, List<VideoResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetVideosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<VideoResponse>> Handle(GetVideosQuery request, CancellationToken cancellationToken)
    {
        var videos = await _context.Videos
            .Select(v => new VideoResponse
            {
                Id = v.Id,
                VideoLink = v.VideoLink
            })
            .ToListAsync(cancellationToken);

        return videos;
       
    }
}

public class VideoResponse
{
    public int Id { get; set; }
    public required string VideoLink { get; set; }
}