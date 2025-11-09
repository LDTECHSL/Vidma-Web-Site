using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using GalleryEntity = Domain.Entities.Gallery.Gallery;
using GalleryImageEntity = Domain.Entities.Gallery.GalleryImages;

namespace Application.UserStories.Gallery;

public class CreateGalleryCommand : IRequest<Result>
{
    public string? Title { get; set; }

    public List<IFormFile> Images { get; set; } = new();
}

public class CreateGalleryCommandHandler : IRequestHandler<CreateGalleryCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateGalleryCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateGalleryCommand request, CancellationToken cancellationToken)
    {
        // validate
        if (string.IsNullOrWhiteSpace(request.Title))
            return Result.Failure("Title is required");

        // start a transaction so we can rollback if anything fails
        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        var gallery = new GalleryEntity
        {
            Title = request.Title,
        };

        _context.Gallery.Add(gallery);

        var uploadedUrls = new List<string>();

        try
        {
            // persist gallery to obtain its Id
            await _context.SaveChangesAsync(cancellationToken);

            // upload images (if any) and create GalleryImages records
            if (request.Images != null && request.Images.Any())
            {
                foreach (var file in request.Images)
                {
                    // use a folder path that includes the gallery id
                    var folderPath = $"gallery/{gallery.Id}";
                    var url = await _dropBoxService.UploadImageAsync(file, folderPath);

                    if (!string.IsNullOrWhiteSpace(url))
                    {
                        uploadedUrls.Add(url);

                        var galleryImage = new GalleryImageEntity
                        {
                            GalleryId = gallery.Id,
                            ImageUrl = url
                        };

                        _context.GalleryImages.Add(galleryImage);
                    }
                }

                // save gallery images
                await _context.SaveChangesAsync(cancellationToken);
            }

            await transaction.CommitAsync(cancellationToken);

            var result = Result.Success("Gallery created successfully");
            result.SetData(gallery.Id);
            return result;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);

            if (uploadedUrls.Any())
            {
                // foreach (var url in uploadedUrls)
                // {
                //     await _dropBoxService.DeleteImageAsync(url);
                // }

                return Result.Failure("Failed to create gallery", ex.Message);
            }
        }
        return Result.Failure("Failed to create gallery");
    }
}