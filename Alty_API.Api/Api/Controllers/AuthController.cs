using Core.IServices;
using Core.Requests;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly IAuth _auth;
	private readonly IMailService _mailService;
	public AuthController(IAuth auth, IMailService mailService)
	{
		_auth = auth;
		_mailService = mailService;
	}
	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] RegisterRequest request)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		var result = await _auth.Register(request);
		if (result.Message.Length > 2)
			return BadRequest(result);

		return Ok( result );
	}
	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginRequest request)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		var result = await _auth.Login(request);

		if (!result.IsAuthenticated)
			return BadRequest(result.Message);

		return Ok(result);
	}
	[HttpPost("confirm-email")]
	public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		var result = await _auth.ConfirmEmail(request);
		if (result.Contains("Confirmed"))
			return Ok(result);

		 return BadRequest(result);
	}
	[HttpPost("resend-confirm-email")]
	public async Task<IActionResult> ResendConfirmEmail([FromBody] ResendConfirmEmail request)
	{
		await _auth.ResendConfirmEmail(request);
		return Ok();
	}

	[HttpPost("forget-password")]
	public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordRequest request)
	{
		await _auth.ForgetPassword(request);
		return Ok();
	}
	[HttpPost("reset-password")]
	public async Task<IActionResult> ResetPassword([FromBody] ResetPassword request)
	{
		var result = await _auth.ResetPassword(request);
		if(result.Contains("Succeed"))
		return Ok(result);

		return BadRequest(result);
	}
}
