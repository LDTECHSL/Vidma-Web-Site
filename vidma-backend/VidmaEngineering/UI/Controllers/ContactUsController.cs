using Application.Common;
using Application.UserStories.ContactUs.Commands;
using Application.UserStories.ContactUs.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;


[ApiController]
[Route("api/contact-us")]
public class ContactUsController(IMediator mediator) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateHero([FromBody] CreateContactUsCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<ActionResult<ContactUsResponse>> GetContactUsInfo()
        => await mediator.Send(new GetContactUsQuery());
}