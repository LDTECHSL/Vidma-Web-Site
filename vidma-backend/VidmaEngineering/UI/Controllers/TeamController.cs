using Application.Common;
using Application.UserStories.Team.Commands;
using Application.UserStories.Team.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;


[ApiController]
[Route("api/teams")]
public class TeamController(IMediator mediator) : ControllerBase
{
    
    [HttpPost]
    public async Task<ActionResult<Result>> CreateTeamMember([FromForm] CreateTeamMemberCommand request)
        => await mediator.Send(request);
    
    [HttpPut]
    public async Task<ActionResult<Result>> UpdateTeamMember([FromForm] CreateTeamMemberCommand request)
        => await mediator.Send(request);

    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteImageFromGallery([FromQuery] DeleteTeamMemberCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<ActionResult<List<TeamResponse>>> GetTeams()
        => await mediator.Send(new GetTeamMembersQuery());
    
}