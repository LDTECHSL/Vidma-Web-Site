using System.ComponentModel.DataAnnotations;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.VideoSection.VideoHeading.Queries;

public record GetVideoHeadingQuery : IRequest<VideoHeadingResponse>;

public class GetVideoHeadingQueryHandler : IRequestHandler<GetVideoHeadingQuery, VideoHeadingResponse>
{
    private readonly IApplicationDbContext _context;

    public GetVideoHeadingQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<VideoHeadingResponse> Handle(GetVideoHeadingQuery request, CancellationToken cancellationToken)
    {
        var videoHeading = await _context.VideoHeading.FirstOrDefaultAsync(cancellationToken);
        if (videoHeading == null)
        {
            throw new Exception("Video Heading not found.");
        }

        var response = new VideoHeadingResponse
        {
            EnglishDesc = videoHeading.EnglishDesc,
            SinhalaDesc = videoHeading.SinhalaDesc,
            TamilDesc = videoHeading.TamilDesc
        };

        return response;
    }
}


public class VideoHeadingResponse
{
    [MaxLength(1000)] public required string EnglishDesc { get; set; }

    [MaxLength(1000)] public required string SinhalaDesc { get; set; }

    [MaxLength(1000)] public required string TamilDesc { get; set; }
}