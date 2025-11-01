using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Gallery.Queries;

public class GetGalleryByIdWithImagesQuery : IRequest<GalleryResponse>
{
    public int GalleryId { get; set; }
}

public class GetGalleryByIdWithImagesQueryHandler : IRequestHandler<GetGalleryByIdWithImagesQuery, GalleryResponse>
{
    private readonly IApplicationDbContext _context;

    public GetGalleryByIdWithImagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<GalleryResponse> Handle(GetGalleryByIdWithImagesQuery request, CancellationToken cancellationToken)
    {
        var imagesWithGalleries = await _context.Gallery
            .Where(g => g.Id == request.GalleryId)
            .Include(x => x.Images)
            .Select(g => new GalleryResponse
            {
                GalleryId = g.Id,
                Title = g.Title,
                Images = g.Images
                    .OrderBy(i => i.Id)
                    .Select(i => new ImageResponse
                    {
                        ImageId = i.Id,
                        ImageUrl = i.ImageUrl
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);

        return imagesWithGalleries!;
    }
}