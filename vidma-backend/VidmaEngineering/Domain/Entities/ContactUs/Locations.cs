using Domain.Entities.Common;
using Domain.Enums;

namespace Domain.Entities.ContactUs;

public class Location : AuditableEntity
{
    public required string LocationName { get; set; }
    
    public LocationType LocationType { get; set; }
    
    public string? Address { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public string? Email { get; set; }
    
    public required string GoogleMapLink { get; set; }
}