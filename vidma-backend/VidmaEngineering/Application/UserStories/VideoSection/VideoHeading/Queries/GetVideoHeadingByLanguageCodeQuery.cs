using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.VideoSection.VideoHeading.Queries;

public class GetVideoHeadingByLanguageCodeQuery : IRequest<VideoHeadingResponseByLanguage>
{
    public string? LanguageCode { get; set; }  
}

public class GetVideoHeadingByLanguageCodeQueryHandler : IRequestHandler<GetVideoHeadingByLanguageCodeQuery, VideoHeadingResponseByLanguage?>
{
    private readonly IApplicationDbContext _context;

    public GetVideoHeadingByLanguageCodeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<VideoHeadingResponseByLanguage?> Handle(GetVideoHeadingByLanguageCodeQuery request, CancellationToken cancellationToken)
    {
        var videoHeading = await _context.VideoHeading.FirstOrDefaultAsync(cancellationToken);
        if (videoHeading == null)
        {
            return null;
        }

        var response = new VideoHeadingResponseByLanguage
        {
            Id = videoHeading.Id,
            Description = request.LanguageCode?.ToLower() switch
            {
                "en" => videoHeading.EnglishDesc,
                "si" => videoHeading.SinhalaDesc,
                "ta" => videoHeading.TamilDesc,
                _ => videoHeading.EnglishDesc
            }
        };
        
        return response;
        
    }
}

public class VideoHeadingResponseByLanguage
{
    public int Id { get; set; }
    public required string Description { get; set; }
}