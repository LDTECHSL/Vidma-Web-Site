using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities.Gallery;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery.GalleryImage;

public class CreateGalleryImageCommand : IRequest<Result>
{
    public required int GalleryId { get; set; }

    public required IFormFile Image { get; set; }
}

public class CreateGalleryImageCommandHandler : IRequestHandler<CreateGalleryImageCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateGalleryImageCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateGalleryImageCommand request, CancellationToken cancellationToken)
    {
        var galleryExist = await _context.Gallery
            .Where(x => x.Id == request.GalleryId)
            .FirstOrDefaultAsync(cancellationToken);

        galleryExist.ThrowIfNull("Gallery cannot found");

        var folderPath = $"gallery/{request.GalleryId}";


        var imageUrlConstruct = await _dropBoxService.UploadImageAsync(request.Image, folderPath);


        var gallerImage = new GalleryImages
        {
            GalleryId = request.GalleryId,
            ImageUrl = imageUrlConstruct
        };
        _context.GalleryImages.Add(gallerImage);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Image uploaded successfully");
    }
}