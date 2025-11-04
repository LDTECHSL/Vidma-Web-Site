using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ProductOrders.Commands;


public class DeleteProductCommand : IRequest<Result>
{
    public int ProductId { get; set; }
}

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public DeleteProductCommandHandler(IApplicationDbContext context,IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Product
            .Where(x=>x.Id == request.ProductId)
            .FirstOrDefaultAsync(cancellationToken);

        if (product == null)
        {
            return Result.Failure("Product not found.");
        }

        await _dropBoxService.DeleteImageAsync(product.ImageUrl!);
        _context.Product.Remove(product);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Product deleted successfully.");
    }
}