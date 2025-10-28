using Core;
using Core.Requests;
using Core.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UsersController : ControllerBase
{
	private readonly IUnitOfWork _unitOf;

	public UsersController(IUnitOfWork unitOf)
	{
		_unitOf = unitOf;
	}
	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		var users = await _unitOf.Users.GetAll();
		return Ok(users);
	}
	//[HttpPut("{id}")]
	//public async Task<IActionResult> Edit([FromBody] EditUser user)
	//{
	//	var isEdited = await _unitOf.Users.Edit(user);

	//	if(!isEdited)
	//		return BadRequest("Editing Failure");
	//	return Ok("Editing Success");
	//}
	[HttpGet("{id}")]
	public async Task<IActionResult> GetByIdAsync([FromRoute] string id)
	{
		var user = await _unitOf.Users.GetById(id);
		if (user == null)
			return BadRequest("no user with this id");

		var importDetail = new EditUser
		{
			FirstName = user.FirstName,
			LastName = user.LastName,
			UserName = user.UserName!,
			PhoneNumber = user.PhoneNumber!
		};
		return Ok(importDetail);
	}
	[HttpPut("{id}")]
	public async Task<IActionResult> Edit([FromRoute] string id, [FromBody] EditUser editUser)
	{

		var user = await _unitOf.Users.Edit(id, editUser);
		if (user is null)
			return BadRequest("update is failed");
		var edited = new EditUser
		{
			FirstName = user.FirstName,
			LastName = user.LastName,
			UserName = user.UserName!,
			PhoneNumber = user.PhoneNumber!
		};
		return Ok(edited);
	}
	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete([FromRoute] string id)
	{
		var isDeleted = await _unitOf.Users.Delete(id);
		if (!isDeleted)
			return BadRequest(new { message = "Deleted is failed" });
		_unitOf.Complete();
		return Ok(new { message = "Deleted is Success" });
	}

	[HttpGet("profile")]

	public async Task<IActionResult> GetProfile()
	{
			var userId = User.FindFirst("uid")?.Value;
		if (userId == null) return Unauthorized();

		var user = await _unitOf.Users.GetProfile(userId);
		if (user == null) return NotFound();

		return Ok(user);
	}
	[HttpPost("upload")]
	public async Task<IActionResult> UploadProfile([FromForm] UploadFileRequest upload)
	{
		var userId =  User.FindFirst("uid")?.Value;
		if (userId == null) return Unauthorized();

		var fileId =await _unitOf.Users.UploadProfileImage(userId,upload.File);
		 _unitOf.Complete();

		return Created();
	}
	[HttpPut("update")]

	public async Task<IActionResult> UpdateProfile(UserProfileRequest model)
	{
		var userId = User.FindFirst("uid")?.Value;
		if (userId == null) return Unauthorized();

	var isUpdated =	await _unitOf.Users.UpdateProfile(userId,model);

		if (!isUpdated)
			return BadRequest("Profile updated successfully");

		_unitOf.Complete();

		return Ok("Profile updated successfully");
	}
}