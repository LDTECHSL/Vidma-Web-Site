using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Entities.AboutUs;
using Domain.Entities.Achievemnets;
using Domain.Entities.ContactUs;
using Domain.Entities.Form;
using Domain.Entities.Gallery;
using Domain.Entities.ProductOrders;
using Domain.Entities.Sections;
using Domain.Entities.Services;
using Domain.Entities.Stats;
using Domain.Entities.Teams;
using Domain.Entities.TopProducts;
using Domain.Entities.VideoSection.VideoHeading;
using Domain.Entities.VideoSection.Videos;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace UI.Controllers;

[ApiController]
[Route("api/seed")]
public class SeedController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public SeedController(IApplicationDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // Helper to read either a JSON array or single object and return a list
    private async Task<List<T>?> ReadJsonListAsync<T>(string jsonFilePath)
    {
        if (!System.IO.File.Exists(jsonFilePath))
            return null;

        var jsonData = await System.IO.File.ReadAllTextAsync(jsonFilePath);
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        // Try array
        try
        {
            var list = JsonSerializer.Deserialize<List<T>>(jsonData, options);
            if (list != null && list.Any())
                return list;

            // Try single object
            var single = JsonSerializer.Deserialize<T>(jsonData, options);
            if (single != null)
                return new List<T> { single };
        }
        catch
        {
            // ignore and return null to indicate failure
        }

        return null;
    }

    [HttpPost("team")]
    public async Task<IActionResult> SeedTeam()
    {
        try
        {
            if (_context.Team.Any())
            {
                return BadRequest(new
                    { message = "Team table already contains data. Clear it first if you want to reseed." });
            }

            var jsonFilePath = Path.Combine(_environment.ContentRootPath, "SeedData", "Team.json");
            var teams = await ReadJsonListAsync<Team>(jsonFilePath);

            if (teams == null || !teams.Any())
            {
                return BadRequest(new { message = "No team data found in JSON file" });
            }

            await _context.Team.AddRangeAsync(teams);
            await _context.SaveChangesAsync(CancellationToken.None);

            var count = teams.Count;
            return Ok(new
            {
                message = "Team data seeded successfully",
                count,
                teams = teams
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while seeding team data", error = ex.Message });
        }
    }

    [HttpPost("user")]
    public async Task<IActionResult> SeedUser()
    {
        try
        {
            if (_context.User.Any()) return BadRequest(new { message = "User table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "User.json");
            var items = await ReadJsonListAsync<User>(path);
            if (items == null || !items.Any()) return BadRequest(new { message = "No user data found in JSON file" });
            await _context.User.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "User seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("hero")]
    public async Task<IActionResult> SeedHero()
    {
        try
        {
            if (_context.Hero.Any()) return BadRequest(new { message = "Hero table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Hero.json");
            var items = await ReadJsonListAsync<Hero>(path);
            if (items == null || !items.Any()) return BadRequest(new { message = "No hero data found in JSON file" });
            await _context.Hero.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Hero seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("location")]
    public async Task<IActionResult> SeedLocation()
    {
        try
        {
            if (_context.Location.Any()) return BadRequest(new { message = "Location table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Location.json");
            var items = await ReadJsonListAsync<Location>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No location data found in JSON file" });
            await _context.Location.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Location seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("contactus")]
    public async Task<IActionResult> SeedContactUs()
    {
        try
        {
            if (_context.ContactUs.Any()) return BadRequest(new { message = "ContactUs table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "ContactUs.json");
            var items = await ReadJsonListAsync<ContactUs>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No contactus data found in JSON file" });
            await _context.ContactUs.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "ContactUs seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("aboutus")]
    public async Task<IActionResult> SeedAboutUs()
    {
        try
        {
            if (_context.AboutUs.Any()) return BadRequest(new { message = "AboutUs table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "AboutUs.json");
            var items = await ReadJsonListAsync<AboutUs>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No aboutus data found in JSON file" });
            await _context.AboutUs.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "AboutUs seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("aboutusimage")]
    public async Task<IActionResult> SeedAboutUsImage()
    {
        try
        {
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "AboutUsImage.json");
            var items = await ReadJsonListAsync<AboutUsImage>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No aboutusimage data found in JSON file" });

            // Upsert by ImageNumber to respect configuration-seeded entries (which provide Ids)
            foreach (var item in items)
            {
                var existing = await _context.AboutUsImage.FirstOrDefaultAsync(a => a.ImageNumber == item.ImageNumber);
                if (existing == null)
                {
                    await _context.AboutUsImage.AddAsync(item);
                }
                else
                {
                    // Copy fields into the tracked entity to avoid tracking conflicts
                    existing.ImageLink = item.ImageLink;
                    existing.EnglishDesc = item.EnglishDesc;
                    existing.TamilDesc = item.TamilDesc;
                    existing.SinhalaDesc = item.SinhalaDesc;

                    // existing is tracked; explicit Update is optional but harmless
                    _context.AboutUsImage.Update(existing);
                }
            }

            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "AboutUsImage seeded/updated", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("service")]
    public async Task<IActionResult> SeedService()
    {
        try
        {
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Service.json");
            var items = await ReadJsonListAsync<Service>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No service data found in JSON file" });


            foreach (var item in items)
            {
                var existing = await _context.Service.FirstOrDefaultAsync(s => s.Id == item.Id);

                if (existing == null)
                {
                    await _context.Service.AddAsync(item);
                }
                else
                {
                    existing.EnglishDesc = item.EnglishDesc;
                    existing.EnglishTitle = item.EnglishTitle;
                    existing.SinhalaDesc = item.SinhalaDesc;
                    existing.SinhalaTitle = item.SinhalaTitle;
                    existing.TamilDesc = item.TamilDesc;
                    existing.TamilTitle = item.TamilTitle;

                    _context.Service.Update(existing);
                }
            }

            // Save all changes in one transaction instead of per-item to avoid concurrency and tracking issues
            await _context.SaveChangesAsync(CancellationToken.None);


            return Ok(new { message = "Service seeded/updated", total = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("topproducts")]
    public async Task<IActionResult> SeedTopProducts()
    {
        try
        {
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "TopProducts.json");
            var items = await ReadJsonListAsync<TopProducts>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No topproducts data found in JSON file" });

            // Allowed ProductName values come from configuration: Product1..Product10
            var allowed = Enumerable.Range(1, 10).Select(i => $"Product{i}").ToHashSet(StringComparer.OrdinalIgnoreCase);

            // Validate incoming ProductNames first to avoid check-constraint DB errors
            var invalid = items.Where(it => string.IsNullOrWhiteSpace(it.ProductName) || !allowed.Contains(it.ProductName)).ToList();
            if (invalid.Any())
            {
                var invalidNames = invalid.Select(i => i.ProductName).Distinct();
                return BadRequest(new { message = "Invalid ProductName values in JSON. Allowed: Product1..Product10", invalid = invalidNames });
            }

            foreach (var item in items)
            {
                var existing = await _context.TopProducts.FirstOrDefaultAsync(tp => tp.ProductName == item.ProductName);
                if (existing == null)
                {
                    await _context.TopProducts.AddAsync(item);
                }
                else
                {
                    // Update tracked entity properties
                    existing.Name = item.Name;
                    existing.Description = item.Description;
                    existing.Colors = item.Colors;
                    existing.ImageLink = item.ImageLink;
                    existing.Materials = item.Materials;

                    _context.TopProducts.Update(existing);
                }
            }

            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "TopProducts seeded/updated", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("videoheading")]
    public async Task<IActionResult> SeedVideoHeading()
    {
        try
        {
            if (_context.VideoHeading.Any())
                return BadRequest(new { message = "VideoHeading table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "VideoHeading.json");
            var items = await ReadJsonListAsync<VideoHeading>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No videoheading data found in JSON file" });
            await _context.VideoHeading.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "VideoHeading seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("videos")]
    public async Task<IActionResult> SeedVideos()
    {
        try
        {
            if (_context.Videos.Any()) return BadRequest(new { message = "Videos table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Videos.json");
            var items = await ReadJsonListAsync<Videos>(path);
            if (items == null || !items.Any()) return BadRequest(new { message = "No videos data found in JSON file" });
            await _context.Videos.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Videos seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("stats")]
    public async Task<IActionResult> SeedStats()
    {
        try
        {
            if (_context.Stats.Any()) return BadRequest(new { message = "Stats table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Stats.json");
            var items = await ReadJsonListAsync<Stats>(path);
            if (items == null || !items.Any()) return BadRequest(new { message = "No stats data found in JSON file" });
            await _context.Stats.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Stats seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("gallery")]
    public async Task<IActionResult> SeedGallery()
    {
        try
        {
            if (_context.Gallery.Any()) return BadRequest(new { message = "Gallery table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Gallery.json");
            var items = await ReadJsonListAsync<Gallery>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No gallery data found in JSON file" });
            await _context.Gallery.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Gallery seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("galleryimages")]
    public async Task<IActionResult> SeedGalleryImages()
    {
        try
        {
            if (_context.GalleryImages.Any())
                return BadRequest(new { message = "GalleryImages table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "GalleryImages.json");
            var items = await ReadJsonListAsync<GalleryImages>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No galleryimages data found in JSON file" });
            await _context.GalleryImages.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "GalleryImages seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("achievements")]
    public async Task<IActionResult> SeedAchievements()
    {
        try
        {
            if (_context.Achievements.Any())
                return BadRequest(new { message = "Achievements table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Achievements.json");
            var items = await ReadJsonListAsync<Achievements>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No achievements data found in JSON file" });
            await _context.Achievements.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Achievements seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("form")]
    public async Task<IActionResult> SeedForm()
    {
        try
        {
            if (_context.Form.Any()) return BadRequest(new { message = "Form table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Form.json");
            var items = await ReadJsonListAsync<Form>(path);
            if (items == null || !items.Any()) return BadRequest(new { message = "No form data found in JSON file" });
            await _context.Form.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Form seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("product")]
    public async Task<IActionResult> SeedProduct()
    {
        try
        {
            if (_context.Product.Any()) return BadRequest(new { message = "Product table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Product.json");
            var items = await ReadJsonListAsync<Product>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No product data found in JSON file" });
            await _context.Product.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Product seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("customer")]
    public async Task<IActionResult> SeedCustomer()
    {
        try
        {
            if (_context.Customer.Any()) return BadRequest(new { message = "Customer table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "Customer.json");
            var items = await ReadJsonListAsync<Customer>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No customer data found in JSON file" });
            await _context.Customer.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "Customer seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("orderitem")]
    public async Task<IActionResult> SeedOrderItem()
    {
        try
        {
            if (_context.OrderItem.Any()) return BadRequest(new { message = "OrderItem table already contains data." });
            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "OrderItem.json");
            var items = await ReadJsonListAsync<OrderItem>(path);
            if (items == null || !items.Any())
                return BadRequest(new { message = "No orderitem data found in JSON file" });
            await _context.OrderItem.AddRangeAsync(items);
            await _context.SaveChangesAsync(CancellationToken.None);
            return Ok(new { message = "OrderItem seeded", count = items.Count });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}