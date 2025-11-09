using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace UI.Controllers;

[ApiController]
[Route("api/footer")]
public class FooterController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private const string SeedFileRelativePath = "SeedData/Footer.json";

    public FooterController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetFooterAsync()
    {
        var path = Path.Combine(_env.ContentRootPath, SeedFileRelativePath);
        if (!System.IO.File.Exists(path))
        {
            return NotFound(new { Message = "Footer data not found.", Path = path });
        }

        try
        {
            await using var stream = System.IO.File.OpenRead(path);
            var dto = await JsonSerializer.DeserializeAsync<FooterDto>(stream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (dto == null)
                return NotFound(new { Message = "Footer data is empty or invalid JSON." });

            return Ok(dto);
        }
        catch (JsonException je)
        {
            return StatusCode(500, new { Message = "Invalid JSON in footer data.", Detail = je.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Error reading footer data.", Detail = ex.Message });
        }
    }

    private class FooterDto
    {
        public string? DomainName { get; set; }
        public string? Value { get; set; }
    }
}