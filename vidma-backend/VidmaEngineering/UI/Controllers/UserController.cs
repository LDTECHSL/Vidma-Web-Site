using Application.UserStories.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;


[ApiController]
[Route("api/user")]
[AllowAnonymous]
public class UserController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<string>> CreateHero([FromForm] ResetPasswordCommand request)
        => await mediator.Send(request);
    
}