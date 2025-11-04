using Application.Common;
using Application.UserStories.ProductOrders.Commands;
using Application.UserStories.ProductOrders.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/products")]
public class ProductManagementController(IMediator mediator) : ControllerBase
{

    [HttpGet("paginated")]
    public async Task<ActionResult<PaginatedProducts>> GetPaginatedProducts([FromQuery] int page, [FromQuery] int pageSize)
    {
        var query = new GetProductsWIthPaginationQuery
        {
            Page = page,
            PageSize = pageSize
        };
        var result = await mediator.Send(query);
        return Ok(result);

    }

    [HttpGet("search")]
    public async Task<ActionResult<List<Products>>> SearchProducts([FromQuery] string query)
    {
        var searchQuery = new SearchProductsQuery
        {
            Query = query
        };
        var result = await mediator.Send(searchQuery);
        return Ok(result);
    }
    
    [HttpGet("customer-orders")]
    public async Task<ActionResult<List<CustomerOrders>>> GetCustomerOrders()
    => Ok(await mediator.Send(new GetCustomerOrdersQuery()));
    
    [HttpPost("add")]
    public async Task<ActionResult<Result>> AddProduct([FromForm] AddProductCommand command)
    => Ok(await mediator.Send(command));
    
    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteProduct([FromQuery] int productId)
    => Ok(await mediator.Send(new DeleteProductCommand { ProductId = productId }));
    
    
    [HttpPost("place-order")]
    public async Task<ActionResult<Result>> PlaceOrder([FromBody] PlaceCustomerOrderCommand command)
    => Ok(await mediator.Send(command));
    
    

}