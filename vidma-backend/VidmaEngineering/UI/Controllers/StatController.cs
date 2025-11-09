using Application.Common;
using Application.UserStories.Stats.Commands;
using Application.UserStories.Stats.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;


[ApiController]
[Route("api/stats")]
public class StatController(IMediator mediator) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateStats([FromBody] CreateStatsCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<ActionResult<StatResponse>> GetStats()
        => await mediator.Send(new GetStatsQuery());
}