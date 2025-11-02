using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities.Gallery;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery.GalleryImage.Commands;

public class CreateGalleryImageCommand : IRequest<Result>
{
    public required int GalleryId { get; set; }

    public required List<IFormFile> Image { get; set; }
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

        if (request.Image == null || request.Image.Count == 0)
        {
            return Result.Failure("No images provided to upload.");
        }

        var galleryImagesToAdd = new List<GalleryImages>();

        foreach (var file in request.Image)
        {
            // upload each file individually
            var imageUrl = await _dropBoxService.UploadImageAsync(file, folderPath);

            if (string.IsNullOrWhiteSpace(imageUrl))
                continue; // skip failed uploads

            galleryImagesToAdd.Add(new GalleryImages
            {
                GalleryId = request.GalleryId,
                ImageUrl = imageUrl
            });
        }

        if (galleryImagesToAdd.Count == 0)
            return Result.Failure("Failed to upload any images.");

        _context.GalleryImages.AddRange(galleryImagesToAdd);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Images uploaded successfully");
    }
}