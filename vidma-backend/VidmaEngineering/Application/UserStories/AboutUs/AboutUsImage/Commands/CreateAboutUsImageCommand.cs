using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.AboutUs.AboutUsImage.Commands;

public class CreateAboutUsImageCommand : IRequest<Result>
{
    public required string EnglishDesc { get; set; }

    public required string SinhalaDesc { get; set; }

    public required string TamilDesc { get; set; }

    public IFormFile? Image { get; set; }

    public required string ImageNumber { get; set; }
}

public class CreateAboutUsImageCommandHandler : IRequestHandler<CreateAboutUsImageCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateAboutUsImageCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }


    public async Task<Result> Handle(CreateAboutUsImageCommand request, CancellationToken cancellationToken)
    {
        //find the existing image by image number
        var existingImage = await _context.AboutUsImage
            .FirstOrDefaultAsync(x => x.ImageNumber == request.ImageNumber, cancellationToken);

        existingImage.ThrowIfNull("About Us Image not found.");


        existingImage.EnglishDesc = request.EnglishDesc;
        existingImage.SinhalaDesc = request.SinhalaDesc;
        existingImage.TamilDesc = request.TamilDesc;


        if (request.Image != null)
        {
            //await _dropBoxService.DeleteImageAsync(existingImage.ImageLink);
            var imageUrl = await _dropBoxService.UploadImageAsync(request.Image, "AboutUsImages");
            existingImage.ImageLink = imageUrl;
        }


        _context.AboutUsImage.Update(existingImage);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Result.Success("About Us Image updated successfully.");
    }
}