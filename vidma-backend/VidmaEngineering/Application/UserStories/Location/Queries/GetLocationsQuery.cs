using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.ContactUs.Location;

public record GetLocationsQuery : IRequest<List<LocationResponse>>;


public class GetLocationsQueryHandler : IRequestHandler<GetLocationsQuery, List<LocationResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetLocationsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<LocationResponse>> Handle(GetLocationsQuery request, CancellationToken cancellationToken)
    {
        var locations = await _context.Location
            .Select(loc => new LocationResponse
            {
                Id = loc.Id,
                LocationName = loc.LocationName,
                LocationType = loc.LocationType,
                Address = loc.Address,
                PhoneNumber = loc.PhoneNumber,
                Email = loc.Email,
                GoogleMapLink = loc.GoogleMapLink
            })
            .ToListAsync(cancellationToken);

        return locations;
    }
}








public class LocationResponse
{
    public int Id { get; set; }
    
    public required string LocationName { get; set; }
    
    public LocationType LocationType { get; set; }
    
    public string? Address { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public string? Email { get; set; }
    
    public required string GoogleMapLink { get; set; }
}