using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserStories.Gallery.Queries;

public class GetGalleriesWithThreeImagesQuery : IRequest<List<GalleryResponse>>;



public class GetGalleriesWithThreeImagesQueryHandler : IRequestHandler<GetGalleriesWithThreeImagesQuery, List<GalleryResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetGalleriesWithThreeImagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<List<GalleryResponse>> Handle(GetGalleriesWithThreeImagesQuery request, CancellationToken cancellationToken)
    {

        var imagesWithGalleries = await _context.Gallery
            .Include(x => x.Images)
            .Select(g => new GalleryResponse
            {
                GalleryId = g.Id,
                Title = g.Title,
                ImageLinks = g.Images
                    .OrderBy(i => i.Id) 
                    .Select(i => i.ImageUrl)
                    .Take(3)
                    .ToList()
            })
            .ToListAsync(cancellationToken);

        return imagesWithGalleries;
    }
}

public class GalleryResponse
{
    public int GalleryId { get; set; }
    
    public string Title { get; set; } = string.Empty;

    public List<string> ImageLinks { get; set; } = new List<string>();
}