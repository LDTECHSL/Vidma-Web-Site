using System.Drawing;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Linq;
using Application.Common.Interfaces;
using Domain.Entities.ProductOrders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services;

public class EmailService(IApplicationDbContext context, IConfiguration configuration) : IEmailService
{
    private const string PrimaryColor = "#050755";
    private const string SalesBccAddress = "vidmamarketplace@gmail.com";

    private static readonly (string Name, Color Color)[] CommonColors =
    {
        ("Red", Color.Red),
        ("Blue", Color.Blue),
        ("Green", Color.Green),
        ("Yellow", Color.Yellow),
        ("Orange", Color.Orange),
        ("Purple", Color.Purple),
        ("Pink", Color.DeepPink),
        ("Brown", Color.SaddleBrown),
        ("Gray", Color.Gray),
        ("Black", Color.Black),
        ("White", Color.White),
        ("Navy", Color.Navy),
        ("Teal", Color.Teal),
        ("Maroon", Color.Maroon)
    };

    private SmtpSettings GetSmtpSettings() =>
        configuration.GetSection("SmtpSettings").Get<SmtpSettings>()
        ?? throw new InvalidOperationException("SmtpSettings is not configured.");
    
    public Task SendProductListEmailAsync()
    {
        throw new NotSupportedException("Use SendOrderConfirmationEmailAsync to send order confirmation emails.");
    }

    public async Task SendOrderConfirmationEmailAsync(
        Customer customer,
        IEnumerable<OrderItem> orderItems,
        string? logoUrl = null,
        CancellationToken cancellationToken = default)
    {
        if (customer == null) throw new ArgumentNullException(nameof(customer));

        var items = orderItems?.Where(i => i.Quantity > 0).ToList() ?? new List<OrderItem>();
        if (!items.Any() || string.IsNullOrWhiteSpace(customer.Email)) return;

        var smtp = GetSmtpSettings();
        var resolvedLogoUrl = string.IsNullOrWhiteSpace(logoUrl) ? smtp.LogoUrl : logoUrl;

        var productIds = items.Select(i => i.ProductId).Distinct().ToList();
        var productLookup = await context.Product
            .Where(p => productIds.Contains(p.Id))
            .Select(p => new
            {
                p.Id,
                p.ProductName,
                p.Color,
                p.Material,
                p.Thickness,
                p.IsLengthRequired
            })
            .ToDictionaryAsync(p => p.Id, cancellationToken);

        var logoMarkup = string.IsNullOrWhiteSpace(resolvedLogoUrl)
            ? string.Empty
            : $"<img src=\"{WebUtility.HtmlEncode(resolvedLogoUrl)}\" alt=\"Vidma Super\" style=\"height:48px; display:block;\" />";

        var contactLine = string.IsNullOrWhiteSpace(customer.PhoneNo)
            ? WebUtility.HtmlEncode(customer.Email ?? string.Empty)
            : $"{WebUtility.HtmlEncode(customer.Email ?? string.Empty)} · {WebUtility.HtmlEncode(customer.PhoneNo)}";

        var sb = new StringBuilder();
        sb.AppendLine("<!DOCTYPE html>");
        sb.AppendLine("<html lang=\"en\">");
        sb.AppendLine("<head>");
        sb.AppendLine("  <meta charset=\"UTF-8\" />");
        sb.AppendLine("  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />");
        sb.AppendLine("  <style>");
        sb.AppendLine("    body { font-family: Arial, sans-serif; background-color: #f5f7fb; margin: 0; padding: 0; color: #1f1f1f; }");
        sb.AppendLine("    .container { max-width: 720px; margin: 0 auto; padding: 24px; }");
        sb.AppendLine("    .card { background: #ffffff; border: 1px solid #e6e8ef; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06); }");
        sb.AppendLine("    .header { background: " + PrimaryColor + "; color: #ffffff; padding: 16px 20px; display: flex; align-items: center; gap: 12px; }");
        sb.AppendLine("    .brand { font-size: 20px; font-weight: 700; letter-spacing: 0.3px; }");
        sb.AppendLine("    .content { padding: 20px; line-height: 1.6; }");
        sb.AppendLine("    .info { margin: 12px 0; }");
        sb.AppendLine("    table { width: 100%; border-collapse: collapse; margin-top: 12px; }");
        sb.AppendLine("    th, td { padding: 10px 8px; text-align: left; border-bottom: 1px solid #eef0f6; font-size: 14px; }");
        sb.AppendLine("    th { background: #f0f2fb; color: #111827; font-weight: 700; }");
        sb.AppendLine("    .footer { padding: 16px 20px 20px; font-size: 12px; color: #6b7280; background: #f9fafc; border-top: 1px solid #eef0f6; }");
        sb.AppendLine("    .pill { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #e5e7ff; color: " + PrimaryColor + "; font-weight: 600; font-size: 12px; }");
        sb.AppendLine("  </style>");
        sb.AppendLine("</head>");
        sb.AppendLine("<body>");
        sb.AppendLine("  <div class=\"container\">");
        sb.AppendLine("    <div class=\"card\">");
        sb.AppendLine("      <div class=\"header\">");
        sb.AppendLine("        " + logoMarkup);
        sb.AppendLine("        <div class=\"brand\">Vidma Super · Total Roofing Products</div>");
        sb.AppendLine("      </div>");
        sb.AppendLine("      <div class=\"content\">");
        sb.AppendLine("        <p>Hi " + WebUtility.HtmlEncode(customer.Name) + ",</p>");
        sb.AppendLine("        <p>Thank you for choosing Vidma Super. We have received your order with the details below:</p>");
        sb.AppendLine("        <div class=\"info\">");
        sb.AppendLine("          <div><strong>Contact:</strong> " + contactLine + "</div>");
        sb.AppendLine("          <div><strong>Delivery address:</strong> " + WebUtility.HtmlEncode(customer.Address ?? "Not provided") + "</div>");
        sb.AppendLine("          <div><span class=\"pill\">" + DateTime.UtcNow.ToString("dd MMM yyyy, HH:mm") + " UTC</span></div>");
        sb.AppendLine("        </div>");
        sb.AppendLine("        <table role=\"presentation\" aria-label=\"Order items\">");
        sb.AppendLine("          <thead>");
        sb.AppendLine("            <tr>");
        sb.AppendLine("              <th style=\"width: 32%;\">Product</th>");
        sb.AppendLine("              <th style=\"width: 12%;\">Qty</th>");
        sb.AppendLine("              <th style=\"width: 14%;\">Color</th>");
        sb.AppendLine("              <th style=\"width: 14%;\">Material</th>");
        sb.AppendLine("              <th style=\"width: 14%;\">Thickness</th>");
        sb.AppendLine("              <th style=\"width: 14%;\">Length</th>");
        sb.AppendLine("            </tr>");
        sb.AppendLine("          </thead>");
        sb.AppendLine("          <tbody>");

        foreach (var item in items)
        {
            var product = productLookup.TryGetValue(item.ProductId, out var p) ? p : null;
            var productName = product?.ProductName ?? $"Product #{item.ProductId}";
            var color = GetColorDisplay(!string.IsNullOrWhiteSpace(item.Color) ? item.Color : product?.Color);
            sb.AppendLine("            <tr>");
            sb.AppendLine("              <td>" + WebUtility.HtmlEncode(productName) + "</td>");
            sb.AppendLine("              <td>" + item.Quantity + "</td>");
            sb.AppendLine("              <td>" + WebUtility.HtmlEncode(color) + "</td>");
            sb.AppendLine("              <td>" + WebUtility.HtmlEncode(item.Material ?? product?.Material ?? "-") + "</td>");
            sb.AppendLine("              <td>" + WebUtility.HtmlEncode(item.Thickness ?? product?.Thickness ?? "-") + "</td>");
            sb.AppendLine("              <td>" + WebUtility.HtmlEncode(item.Length ?? (product?.IsLengthRequired == true ? "Required" : "-")) + "</td>");
            sb.AppendLine("            </tr>");
        }

        sb.AppendLine("          </tbody>");
        sb.AppendLine("        </table>");
        sb.AppendLine("        <p style=\"margin-top:16px;\">A member of our sales team will reach out shortly to confirm availability, pricing, and delivery scheduling.</p>");
        sb.AppendLine("        <p style=\"margin-top:4px;\">If you have any questions, simply reply to this email.</p>");
        sb.AppendLine("      </div>");
        sb.AppendLine("      <div class=\"footer\">");
        sb.AppendLine("        Vidma Super · Total Roofing Products<br />");
        sb.AppendLine("        Thank you for trusting us with your roofing needs.");
        sb.AppendLine("      </div>");
        sb.AppendLine("    </div>");
        sb.AppendLine("  </div>");
        sb.AppendLine("</body>");
        sb.AppendLine("</html>");

        using var message = new MailMessage
        {
            From = new MailAddress(smtp.SenderEmail, "Vidma Super"),
            Subject = "Your Vidma Super order details",
            Body = sb.ToString(),
            IsBodyHtml = true
        };

        message.To.Add(new MailAddress(customer.Email!));
        message.Bcc.Add(new MailAddress(SalesBccAddress));

        using var client = new SmtpClient(smtp.Host, smtp.Port)
        {
            EnableSsl = smtp.EnableSsl,
            Credentials = new NetworkCredential(smtp.Username, smtp.Password)
        };

        await client.SendMailAsync(message, cancellationToken);
    }

    private static string GetColorDisplay(string? rawColor)
    {
        if (string.IsNullOrWhiteSpace(rawColor)) return "-";

        var trimmed = rawColor.Trim();
        if (trimmed.StartsWith("#") && trimmed.Length >= 4)
        {
            try
            {
                var parsed = ColorTranslator.FromHtml(trimmed);
                if (parsed.IsKnownColor) return parsed.Name;

                var exactKnown = Enum.GetValues<KnownColor>()
                    .Select(Color.FromKnownColor)
                    .FirstOrDefault(c => c.ToArgb() == parsed.ToArgb());
                if (exactKnown.IsKnownColor) return exactKnown.Name;

                var nearest = CommonColors
                    .Select(c => new { c.Name, Distance = ColorDistance(parsed, c.Color) })
                    .OrderBy(x => x.Distance)
                    .FirstOrDefault();

                if (nearest != null) return nearest.Name;
            }
            catch
            {
                // ignore parse errors and fall back to the raw value
            }
        }

        return trimmed;
    }

    private static int ColorDistance(Color a, Color b)
    {
        var dr = a.R - b.R;
        var dg = a.G - b.G;
        var db = a.B - b.B;
        return dr * dr + dg * dg + db * db;
    }
}