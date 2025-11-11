using Application.Common;
using Application.UserStories.Achievements.Commands;
using Application.UserStories.Achievements.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/achievements")]
public class AchievementController(IMediator mediator) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateAchievement([FromForm] CreateAchievementCommand request)
        => await mediator.Send(request);
    
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<Result>> UpdateAchievement([FromForm] UpdateAchievementCommand request)
        => await mediator.Send(request);
    
    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteAchievement([FromQuery] int achievementId)
        => await mediator.Send(new DeleteAchievementCommand { AchievementId = achievementId });
    
    [HttpGet]
    public async Task<ActionResult<List<AchievementResponse>>> GetAchievements()
        => await mediator.Send(new GetAchievementQuery());
}