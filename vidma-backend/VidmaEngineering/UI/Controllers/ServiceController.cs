using Application.Common;
using Application.UserStories.Services.Commands;
using Application.UserStories.Services.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/services")]
public class ServiceController(IMediator mediator) : ControllerBase
{
    
    [HttpGet]
    public async Task<ActionResult<List<ServiceResponse>>> GetServices()
        => await mediator.Send(new GetServicesQuery());
    
    [HttpGet("by-language")]
    public async Task<ActionResult<List<ServiceLanguageResponse>>> GetServicesByLanguage([FromQuery] string languageCode)
        => await mediator.Send(new GetServiceByLanguageQuery { LanguageCode = languageCode });
    
    [HttpPost]
    public async Task<ActionResult<Result>> CreateService([FromBody] CreateServicesCommand request)
        => await mediator.Send(request);
    
}