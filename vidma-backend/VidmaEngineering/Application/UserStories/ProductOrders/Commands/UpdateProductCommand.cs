using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.ProductOrders.Commands;

public class UpdateProductCommand : IRequest<Result>
{
    public int ProductId { get; set; }
    public required string ProductName { get; set; }
    public IFormFile? Image { get; set; }
    public string? Color { get; set; }
    public string? Material { get; set; }
    public string? Thickness { get; set; }
    public string? Length { get; set; }
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public UpdateProductCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }
    
    public async Task<Result> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var existProduct = await _context.Product
            .Where(x => x.Id == request.ProductId)
            .FirstOrDefaultAsync(cancellationToken);
        
        existProduct.ThrowIfNull("Product not found.");
        
        
        existProduct.ProductName = request.ProductName;
        existProduct.Color = request.Color;
        existProduct.Material = request.Material;
        existProduct.Thickness = request.Thickness;
        existProduct.Length = request.Length;
        if (request.Image != null)
        {
            existProduct.ImageUrl = await _dropBoxService.UploadImageAsync(request.Image, "Products");
        }
        
        _context.Product.Update(existProduct);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Result.Success("Product updated successfully.");
    }
}