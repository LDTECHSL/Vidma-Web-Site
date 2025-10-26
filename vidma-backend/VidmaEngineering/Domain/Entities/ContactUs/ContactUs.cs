namespace Domain.Entities.ContactUs;

public class ContactUs
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