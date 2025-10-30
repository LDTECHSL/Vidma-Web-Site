using Application.Common;
using Application.UserStories.TopProducts.Commands;
using Application.UserStories.TopProducts.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/top-products")]
public class TopProductsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Result>> CreateProduct([FromBody] CreateTopProductsCommand request)
        => await mediator.Send(request);
    
    [HttpGet]
    public async Task<ActionResult<List<TopProductResponse>>> GetTopProducts()
        => await mediator.Send(new GetTopProductsQuery());
    
    
}