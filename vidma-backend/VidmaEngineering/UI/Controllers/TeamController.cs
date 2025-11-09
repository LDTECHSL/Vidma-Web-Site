using Application.Common;
using Application.UserStories.Team.Commands;
using Application.UserStories.Team.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;


[ApiController]
[Route("api/teams")]
public class TeamController(IMediator mediator) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateTeamMember([FromForm] CreateTeamMemberCommand request)
        => await mediator.Send(request);
    
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<Result>> UpdateTeamMember([FromForm] UpdateTeamMemberCommand request)
        => await mediator.Send(request);

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteImageFromGallery([FromQuery] DeleteTeamMemberCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<ActionResult<List<TeamResponse>>> GetTeams()
        => await mediator.Send(new GetTeamMembersQuery());
    
}