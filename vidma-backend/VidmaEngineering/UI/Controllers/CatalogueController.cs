using Application.Common;
using Application.UserStories.Catalogues.Commands;
using Application.UserStories.Catalogues.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[Route("api/catalogue")]
[ApiController]
public class CatalogueController(IMediator mediator) : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult<Result>> CreateCatalogue([FromForm] CreateCatalogueCommand command)
        => await mediator.Send(command);

    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteCatalogue(int id)
        => await mediator.Send(new DeleteCatalogueCommand { Id = id });

    [HttpPut]
    public async Task<ActionResult<Result>> UpdateCatalogue([FromForm] UpdateCatalogueCommand command)
        => await mediator.Send(command);

    [HttpGet]
    public async Task<ActionResult<List<CatalogueResponse>>> GetAllCatalogues()
        => await mediator.Send(new GetAllCataloguesQuery());

    [HttpGet("{id}")]
    public async Task<ActionResult<CatalogueResponse>> GetCatalogueById(int id)
        => await mediator.Send(new GetCatalogueByIdQuery { CatalogueId = id });
}