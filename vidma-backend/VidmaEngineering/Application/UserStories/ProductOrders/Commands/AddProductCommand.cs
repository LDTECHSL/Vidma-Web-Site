using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.ProductOrders.Commands;

public class AddProductCommand : IRequest<Result>
{
    public required string ProductName { get; set; }

    public string? Description { get; set; }

    public IFormFile? Image { get; set; }

    public string? Color { get; set; }
}

public class AddProductCommandHandler : IRequestHandler<AddProductCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public AddProductCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Domain.Entities.ProductOrders.Product
        {
            ProductName = request.ProductName,
            Description = request.Description,
            ImageUrl = request.Image != null
                ? await _dropBoxService.UploadImageAsync(request.Image, "Products")
                : null,
            Color = request.Color
        };

        _context.Product.Add(product);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Product added successfully.");
    }
}