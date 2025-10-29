using System.ComponentModel.DataAnnotations;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.AboutUs.Queries;

public class GetAboutQuery : IRequest<AboutUsResponse>
{
}

public class GetAboutQueryHandler : IRequestHandler<GetAboutQuery, AboutUsResponse>
{
    private readonly IApplicationDbContext _context;

    public GetAboutQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AboutUsResponse> Handle(GetAboutQuery request, CancellationToken cancellationToken)
    {
        var details = await _context.AboutUs.FirstOrDefaultAsync(cancellationToken);

        var detailResponse = new AboutUsResponse
        {
            EnglishDesc = details?.EnglishDesc ?? string.Empty,
            SinhalaDesc = details?.SinhalaDesc ?? string.Empty,
            TamilDesc = details?.TamilDesc ?? string.Empty
        };

        return detailResponse;
    }
}

public class AboutUsResponse
{
    [MaxLength(300)] public required string EnglishDesc { get; set; }

    [MaxLength(300)] public required string SinhalaDesc { get; set; }

    [MaxLength(300)] public required string TamilDesc { get; set; }
}