using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ContactUs.Queries;

public record GetContactUsQuery : IRequest<ContactUsResponse>;

public class GetContactUsQueryHandler : IRequestHandler<GetContactUsQuery, ContactUsResponse>
{
    private readonly IApplicationDbContext _context;

    public GetContactUsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ContactUsResponse> Handle(GetContactUsQuery request, CancellationToken cancellationToken)
    {
        var details = await _context.ContactUs.FirstOrDefaultAsync(cancellationToken);

        var detailResponse = new ContactUsResponse
        {
            Id = details?.Id ?? 0,
            Address = details?.Address ?? string.Empty,
            Phone = details?.Phone ?? string.Empty,
            Email = details?.Email ?? string.Empty,
            WorkingHours = details?.WorkingHours ?? string.Empty,
            FacebookLink = details?.FacebookLink ?? string.Empty,
            WhatsappLink = details?.WhatsappLink ?? string.Empty,
            TikTokLink = details?.TikTokLink ?? string.Empty
        };

        return detailResponse;
    }
}

public class ContactUsResponse
{
    public int Id { get; set; }
    public required string Address { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string WorkingHours { get; set; }
    public required string FacebookLink { get; set; }
    public required string WhatsappLink { get; set; }
    public required string TikTokLink { get; set; }
}