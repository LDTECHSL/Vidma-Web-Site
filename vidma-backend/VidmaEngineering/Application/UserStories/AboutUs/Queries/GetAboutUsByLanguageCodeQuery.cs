using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.AboutUs.Queries;

public class GetAboutUsByLanguageCodeQuery : IRequest<AboutUsResponseByLanguageCode>
{
    // Allow null to avoid non-nullable uninitialized warning; handler defaults to "en" when null
    public string? LanguageCode { get; set; }
}


public class GetAboutUsByLanguageCodeQueryHandler : IRequestHandler<GetAboutUsByLanguageCodeQuery, AboutUsResponseByLanguageCode>
{
    private readonly IApplicationDbContext _context;

    public GetAboutUsByLanguageCodeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<AboutUsResponseByLanguageCode> Handle(GetAboutUsByLanguageCodeQuery request, CancellationToken cancellationToken)
    {
        // Get the single AboutUs entry (or null if not present)
        var aboutUs = await _context.AboutUs
            .FirstOrDefaultAsync(cancellationToken);

        if (aboutUs == null)
        {
            // Return an empty description when there's no data
            return new AboutUsResponseByLanguageCode(string.Empty);
        }

        // request is not nullable here (MediatR guarantees a non-null request), so use its LanguageCode directly
        var lang = (request.LanguageCode ?? "en").ToLowerInvariant();

        var description = lang switch
        {
            "en" => aboutUs.EnglishDesc,
            "si" => aboutUs.SinhalaDesc,
            "ta" => aboutUs.TamilDesc,
            _ => aboutUs.EnglishDesc
        };

        return new AboutUsResponseByLanguageCode(description);
    }
}


public record AboutUsResponseByLanguageCode(string Description);
