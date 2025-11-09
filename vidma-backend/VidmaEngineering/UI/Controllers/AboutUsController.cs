using Application.Common;
using Application.UserStories.AboutUs.AboutUsImage.Commands;
using Application.UserStories.AboutUs.AboutUsImage.Queries;
using Application.UserStories.AboutUs.Commands;
using Application.UserStories.AboutUs.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/about-us")]
public class AboutUsController(IMediator mediator) : ControllerBase
{
    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateHero([FromBody] CreateAboutUsCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<AboutUsResponse> GetAboutUsInfo()
        => await mediator.Send(new GetAboutQuery());
    
    [HttpGet("by-language")]
    public async Task<AboutUsResponseByLanguageCode> GetAboutUsInfo([FromQuery] string languageCode)
        => await mediator.Send(new GetAboutUsByLanguageCodeQuery
        {
            LanguageCode = languageCode
        });
    
    
    [HttpPost("image")]
    public async Task<ActionResult<Result>> UploadImage([FromForm] CreateAboutUsImageCommand request)
        => await mediator.Send(request);
    
    [HttpGet("image")]
    public async Task<List<AboutUsImageResponse>> GetAboutUsImageInfo()
        => await mediator.Send(new GetAboutUsImagesQuery());
    
    [HttpGet("image-by-language")]
    public async Task<List<AboutUsImageResponseByLanguage>> GetAboutUsByLanguageImageInfo([FromQuery] string languageCode)
        => await mediator.Send(new GetAboutUsImageByLanguageCodeQuery
        {
            LanguageCode = languageCode
        });

}