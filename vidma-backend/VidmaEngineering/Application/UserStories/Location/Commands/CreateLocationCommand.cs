using Application.Common;
using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Location.Commands;

public class CreateLocationCommand : IRequest<Result>
{
    public int? Id { get; set; }
    public required string LocationName { get; set; }

    public LocationType LocationType { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public required string GoogleMapLink { get; set; }
}

public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateLocationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<Result> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
    {
        if (request.Id.HasValue)
        {
            var existingLocation =
                await _context.Location.FirstOrDefaultAsync(cancellationToken);


            if (existingLocation == null)
            {
                return Result.Failure("Location not found.");
            }

            existingLocation.LocationName = request.LocationName;
            existingLocation.LocationType = request.LocationType;
            existingLocation.Address = request.Address;
            existingLocation.PhoneNumber = request.PhoneNumber;
            existingLocation.Email = request.Email;
            existingLocation.GoogleMapLink = request.GoogleMapLink;
            _context.Location.Update(existingLocation);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }


        var location = new Domain.Entities.ContactUs.Location
        {
            LocationName = request.LocationName,
            LocationType = request.LocationType,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            GoogleMapLink = request.GoogleMapLink
        };

        _context.Location.Add(location);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}