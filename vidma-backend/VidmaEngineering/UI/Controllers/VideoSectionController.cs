using Application.Common;
using Application.UserStories.VideoSection.Video.Commands;
using Application.UserStories.VideoSection.Video.Queries;
using Application.UserStories.VideoSection.VideoHeading.Commands;
using Application.UserStories.VideoSection.VideoHeading.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/video-section")]
public class VideoSectionController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Result>> CreateHero([FromBody] CreateVideoHeadingCommand request)
        => await mediator.Send(request);

    [HttpGet]
    public async Task<VideoHeadingResponse> GetAboutUsInfo()
        => await mediator.Send(new GetVideoHeadingQuery());

    [HttpGet("by-language")]
    public async Task<VideoHeadingResponseByLanguage> GetAboutUsInfo([FromQuery] string languageCode)
        => await mediator.Send(new GetVideoHeadingByLanguageCodeQuery()
        {
            LanguageCode = languageCode
        });

    [HttpPost("video")]
    public async Task<ActionResult<Result>> UploadVideoSection([FromBody] CreateVideoCommand request)
        => await mediator.Send(request);

    [HttpDelete("video")]
    public async Task<ActionResult<Result>> DeleteVideo([FromQuery] int id)
        => await mediator.Send(new DeleteVideoCommand
        {
            Id = id
        });

    [HttpGet("video")]
    public async Task<List<VideoResponse>> GetVideos()
        => await mediator.Send(new GetVideosQuery());
}