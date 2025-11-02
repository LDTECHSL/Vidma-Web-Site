using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery;

public class UpdateGalleryCommand : IRequest<Result>
{
    public int GalleryId { get; set; }

    public required string Title { get; set; }
}

public class UpdateGalleryCommandHandler : IRequestHandler<UpdateGalleryCommand, Result>
{
    private readonly IApplicationDbContext _context;


    public UpdateGalleryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<Result> Handle(UpdateGalleryCommand request, CancellationToken cancellationToken)
    {
        var galleryExist = await _context.Gallery
            .Where(g => g.Id == request.GalleryId)
            .FirstOrDefaultAsync(cancellationToken);
        
        
        galleryExist.ThrowIfNull("Gallery not found.");
        
        
        galleryExist.Title = request.Title;
        _context.Gallery.Update(galleryExist);
        await _context.SaveChangesAsync(cancellationToken);
        
        
        return Result.Success("Gallery updated successfully.");
    }
}