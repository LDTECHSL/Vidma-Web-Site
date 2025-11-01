using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery;

public class DeleteGalleryCommand : IRequest<Result>
{
    public int GalleryId { get; set; }
}


public class GalleryCommandHandler : IRequestHandler<DeleteGalleryCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public GalleryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteGalleryCommand request, CancellationToken cancellationToken)
    {
        var gallery = await _context.Gallery
            .Where(x=>x.Id == request.GalleryId)
            .FirstOrDefaultAsync(cancellationToken);
      
        gallery.ThrowIfNull("Gallery not found.");
        
        _context.Gallery.Remove(gallery);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Gallery deleted successfully.");
    }
}