using System.Net.Mime;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.AboutUs.AboutUsImage.Queries;

public class GetAboutUsImagesQuery : IRequest<List<AboutUsImageResponse>>
{
    
}


public class GetAboutUsImagesQueryHandler : IRequestHandler<GetAboutUsImagesQuery, List<AboutUsImageResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetAboutUsImagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<AboutUsImageResponse>> Handle(GetAboutUsImagesQuery request, CancellationToken cancellationToken)
    {
        var aboutUsImages = await _context.AboutUsImage.ToListAsync(cancellationToken);

        var response = aboutUsImages.Select(image => new AboutUsImageResponse
        {
            Id = image.Id,
            ImageNumber = image.ImageNumber,
            ImageLink = image.ImageLink,
            EnglishDesc = image.EnglishDesc,
            TamilDesc = image.TamilDesc,
            SinhalaDesc = image.SinhalaDesc
        }).ToList();

        return response;
    }
}





public class AboutUsImageResponse
{
    public int Id { get; set; }

    public required string ImageNumber { get; set; } = "Image1";

    public required string ImageLink { get; set; }

    public required string EnglishDesc { get; set; } = "Description1";

    public required string TamilDesc { get; set; } = "Description1";

    public required string SinhalaDesc { get; set; } = "Description1";
}