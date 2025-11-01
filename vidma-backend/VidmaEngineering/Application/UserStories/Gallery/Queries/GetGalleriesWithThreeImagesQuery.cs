using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserStories.Gallery.Queries
{
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
            var galleries = await _context.Gallery
                .Include(x => x.Images)
                .Select(g => new GalleryResponse
                {
                    GalleryId = g.Id,
                    Title = g.Title,
                    Images = g.Images
                        .OrderBy(i => i.Id)
                        .Take(3)
                        .Select(i => new ImageResponse
                        {
                            ImageId = i.Id,
                            ImageUrl = i.ImageUrl
                        })
                        .ToList()
                })
                .ToListAsync(cancellationToken);

            return galleries;
        }
    }

    public class GalleryResponse
    {
        public int GalleryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public List<ImageResponse> Images { get; set; } = new();
    }

    public class ImageResponse
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}