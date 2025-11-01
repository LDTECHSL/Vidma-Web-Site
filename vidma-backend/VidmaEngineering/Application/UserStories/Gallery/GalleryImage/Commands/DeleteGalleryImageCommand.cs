using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery.GalleryImage;

public class DeleteGalleryImageCommand : IRequest<Result>
{
    public int GalleryImageId { get; set; }
}

public class DeleteGalleryImageCommandHandler : IRequestHandler<DeleteGalleryImageCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteGalleryImageCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteGalleryImageCommand request, CancellationToken cancellationToken)
    {
        var image = await _context.GalleryImages
            .Where(x => x.Id == request.GalleryImageId)
            .FirstOrDefaultAsync(cancellationToken);


        image.ThrowIfNull("image do not exist");


        _context.GalleryImages.Remove(image);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Image deleted successfully");
    }
}