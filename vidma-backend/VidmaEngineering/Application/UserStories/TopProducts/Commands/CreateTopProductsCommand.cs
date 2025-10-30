using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.TopProducts.Commands;

public class CreateTopProductsCommand : IRequest<Result>
{
    [MaxLength(100)]
    public required string Name { get; set; }
    
    [MaxLength(1000)]
    public required string Description { get; set; }

    [MaxLength(500)]
    public required string Colors { get; set; }

    public IFormFile? Image { get; set; }

    [MaxLength(100)]
    public required string ProductName { get; set; }
    
}


public class CreateTopProductsCommandHandler : IRequestHandler<CreateTopProductsCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateTopProductsCommandHandler(IApplicationDbContext context,IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateTopProductsCommand request, CancellationToken cancellationToken)
    {
      var existingTopProduct = await _context.TopProducts
            .FirstOrDefaultAsync(tp => tp.ProductName == request.ProductName, cancellationToken);
      
      existingTopProduct.ThrowIfNull("Top Product not found.");
      
      
        existingTopProduct.Name = request.Name;
        existingTopProduct.Description = request.Description;
        existingTopProduct.Colors = request.Colors;
        if (request.Image != null)
        {
            var imageUrl = await _dropBoxService.UploadImageAsync(request.Image, "topproducts");
            existingTopProduct.ImageLink = imageUrl;
        }
        _context.TopProducts.Update(existingTopProduct);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Top Products created successfully.");
    }
}