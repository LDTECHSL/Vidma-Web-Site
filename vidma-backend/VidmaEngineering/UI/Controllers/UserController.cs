using Application.Common;
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
    [HttpPost("reset-password")]
    public async Task<ActionResult<string>> CreateHero([FromForm] ResetPasswordCommand request)
        => await mediator.Send(request);

    [HttpGet("list")]
    public async Task<ActionResult<List<UserResponse>>> GetUserInfo()
        => await mediator.Send(new UserListQuery());
    
    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteUser([FromQuery] DeleteUserCommand request)
        => await mediator.Send(request);
    
    [HttpPut("change-password")]
    public async Task<ActionResult<Result>> ChangePassword([FromBody] ChangePasswordCommand request)
        => await mediator.Send(request);
}