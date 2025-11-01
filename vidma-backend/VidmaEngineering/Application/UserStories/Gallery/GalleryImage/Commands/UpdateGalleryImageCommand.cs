using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Gallery.GalleryImage;

public class UpdateGalleryImageCommand : IRequest<Result>
{
    public required int GalleryImageId { get; set; }

    public required IFormFile Image { get; set; }
    
}


public class UpdateGalleryImageCommandHandler : IRequestHandler<UpdateGalleryImageCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public UpdateGalleryImageCommandHandler(IApplicationDbContext context,IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }
    
    
    public async Task<Result> Handle(UpdateGalleryImageCommand request, CancellationToken cancellationToken)
    {

        var galleryImageExists = await _context.GalleryImages
            .Where(x => x.Id == request.GalleryImageId)
            .FirstOrDefaultAsync(cancellationToken);
        
        galleryImageExists.ThrowIfNull("Gallery Image not found.");
        
        //delete existing image from dropbox
        if (!string.IsNullOrEmpty(galleryImageExists.ImageUrl))
        {
            await _dropBoxService.DeleteImageAsync(galleryImageExists.ImageUrl);
        }
        
        var imageLink = await _dropBoxService.UploadImageAsync(request.Image, "gallery-images");
        
        galleryImageExists.ImageUrl = imageLink;
        
        _context.GalleryImages.Update(galleryImageExists);
        await  _context.SaveChangesAsync(cancellationToken);
        
        return Result.Success("Gallery Image updated successfully.");


    }
}