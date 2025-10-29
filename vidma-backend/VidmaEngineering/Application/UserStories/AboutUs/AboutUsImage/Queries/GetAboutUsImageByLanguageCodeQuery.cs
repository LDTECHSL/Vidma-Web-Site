using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.AboutUs.AboutUsImage.Queries;

public class GetAboutUsImageByLanguageCodeQuery : IRequest<List<AboutUsImageResponseByLanguage>>
{
    public string LanguageCode { get; set; }
}


public class GetAboutUsImageByLanguageCodeQueryHandler : IRequestHandler<GetAboutUsImageByLanguageCodeQuery, List<AboutUsImageResponseByLanguage>>
{
    private readonly IApplicationDbContext _context;

    public GetAboutUsImageByLanguageCodeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<AboutUsImageResponseByLanguage>> Handle(GetAboutUsImageByLanguageCodeQuery request, CancellationToken cancellationToken)
    {
        //if LanguageCode is "en", return image links and descriptions in English(EnglishDesc)
        
        var aboutUsImages = await _context.AboutUsImage.ToListAsync(cancellationToken); 
        var response = aboutUsImages.Select(image => new AboutUsImageResponseByLanguage
        {
            Id = image.Id,
            ImageNumber = image.ImageNumber,
            ImageLink = image.ImageLink,
            Description = request.LanguageCode.ToLower() switch
            {
                "en" => image.EnglishDesc,
                "si" => image.SinhalaDesc,
                "ta" => image.TamilDesc,
                _ => image.EnglishDesc
            }
        }).ToList();
        
        return response;
        
    }
}

public class AboutUsImageResponseByLanguage
{
    public int Id { get; set; }

    public required string ImageNumber { get; set; } = "Image1";

    public required string ImageLink { get; set; }

    public required string Description { get; set; } = "Description1";

}