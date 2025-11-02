using Application.Common;
using Application.UserStories.Form;
using Application.UserStories.Form.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/form")]
public class FormController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Result>> CreateForm([FromBody] CreateFormCommand request)
        => await mediator.Send(request);

    [HttpGet]
    public async Task<ActionResult<List<FormResponse>>> GetFormById()
        => await mediator.Send(new GetFormQuery());
}