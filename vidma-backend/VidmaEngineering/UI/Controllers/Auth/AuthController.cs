using Application.Common.Interfaces;
using Application.UserStories.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers.Auth;

[ApiController]
[Route("api/auth")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    
    
    public AuthController(IMediator mediator, IApplicationDbContext context, IConfiguration configuration)
    {
        _mediator = mediator;
        _context = context;
        _configuration = configuration;
    }
    
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationResponse registrationResponse)
    {
        var command = new RegistrationCommand { RegistrationResponse = registrationResponse };
        var user = await _mediator.Send(command);

        return Ok(user);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var token = await _mediator.Send(command);
        return Ok(token);
    }
    
}