using Application.Common;
using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ContactUs.Commands;

public class CreateContactUsCommand : IRequest<Result>
{
    public required string Address { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string WorkingHours { get; set; }
    public required string FacebookLink { get; set; }
    public required string WhatsappLink { get; set; }
    public required string TikTokLink { get; set; }
}

public class CreateContactUsCommandHandler : IRequestHandler<CreateContactUsCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateContactUsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<Result> Handle(CreateContactUsCommand request, CancellationToken cancellationToken)
    {
        var existContactUs = await _context.ContactUs
            .FirstOrDefaultAsync(cancellationToken);

        if (existContactUs != null)
        {
            _context.ContactUs.Remove(existContactUs);
            await _context.SaveChangesAsync(cancellationToken);
        }

        // Create new ContactUs entry
        var newContactUs = new Domain.Entities.ContactUs.ContactUs
        {
            Phone = request.Phone,
            Email = request.Email,
            WorkingHours = request.WorkingHours,
            FacebookLink = request.FacebookLink,
            WhatsappLink = request.WhatsappLink,
            TikTokLink = request.TikTokLink,
            Address = request.Address,
        };
        _context.ContactUs.Add(newContactUs);
        await _context.SaveChangesAsync(cancellationToken);
        
        
        return Result.Success("Contact Us information created successfully.");
    }
}