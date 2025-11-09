using Application.Common;
using Application.UserStories.Gallery;
using Application.UserStories.Gallery.GalleryImage;
using Application.UserStories.Gallery.GalleryImage.Commands;
using Application.UserStories.Gallery.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

[ApiController]
[Route("api/gallery")]
public class GalleryController(IMediator mediator) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Result>> CreateGallery([FromForm] CreateGalleryCommand request)
        => await mediator.Send(request);

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<Result>> DeleteGallery([FromQuery] DeleteGalleryCommand request)
        => await mediator.Send(request);

    [HttpGet("all")]
    public async Task<ActionResult<List<GalleryResponse>>> GetGallery()
        => await mediator.Send(new GetGalleriesWithThreeImagesQuery());

    [HttpGet("by-id")]
    public async Task<ActionResult<GalleryResponse>> GetGalleryById([FromQuery] GetGalleryByIdWithImagesQuery request)
        => await mediator.Send(request);

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<Result>> UpdateGalleryImage([FromBody] UpdateGalleryCommand request)
        => await mediator.Send(request);

    [Authorize]
    [HttpPost("image")]
    public async Task<ActionResult<Result>> AddImageToGallery([FromForm] CreateGalleryImageCommand request)
        => await mediator.Send(request);

    [Authorize]
    [HttpDelete("image")]
    public async Task<ActionResult<Result>> DeleteImageFromGallery([FromQuery] DeleteGalleryImageCommand request)
        => await mediator.Send(request);

    [Authorize]
    [HttpPut("image")]
    public async Task<ActionResult<Result>> UpdateGalleryImage([FromForm] UpdateGalleryImageCommand request)
        => await mediator.Send(request);
}