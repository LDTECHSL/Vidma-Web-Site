using Application.Common;
using Application.UserStories.ContactUs.Location;
using Application.UserStories.Location.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/location")]
public class LocationController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Result>> CreateLocation([FromBody] CreateLocationCommand request)
        => await mediator.Send(request);

    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteLocation([FromQuery] DeleteLocationCommand request)
        => await mediator.Send(request);

    [HttpGet]
    public async Task<ActionResult<List<LocationResponse>>> GetContactUsInfo()
        => await mediator.Send(new GetLocationsQuery());
}