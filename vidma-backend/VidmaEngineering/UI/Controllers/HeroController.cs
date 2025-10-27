using Application.Common;
using Application.UserStories.Hero.Commands;
using Application.UserStories.Hero.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/hero")]
[AllowAnonymous]
public class HeroController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Result>> CreateHero([FromForm] CreateHeroCommand request)
        => await mediator.Send(request);

    [HttpGet]
    public async Task<ActionResult<HeroResponse>> GetHeroById([FromQuery] string languageCode)
        => await mediator.Send(new GetHeroQueryByLanguage { LanguageCode = languageCode });

    [HttpGet("all")]
    public async Task<ActionResult<HeroResponseAll>> GetHeroByAll()
        => await mediator.Send(new GetAllHeroQuery());
}