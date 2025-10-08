using Api.Helpers;
using Core;
using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.IServices;
using Core.Requests;
using Core.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;
public class Auth : IAuth
{
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly RoleManager<IdentityRole> _roleManager;
	private readonly SignInManager<ApplicationUser> _signInManger ;
	private readonly ILogger<Auth> _logger;
	private readonly JWT _jwt;
	private readonly IMailService _mailService;
	private readonly IHttpContextAccessor _contextAccessor;

	public Auth(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt, SignInManager<ApplicationUser> signInManger, ILogger<Auth> logger, IMailService mailService, IHttpContextAccessor contextAccessor)
	{
		_userManager = userManager;
		_roleManager = roleManager;
		_jwt = jwt.Value;
		_signInManger = signInManger;
		_logger = logger;
		_mailService = mailService;
		_contextAccessor = contextAccessor;
	}


	public async Task<AuthRes> Register(RegisterRequest request)
	{

		if(await _userManager.FindByEmailAsync(request.Email) is not null)
			return  new AuthRes { 
			Message= "Email is already Exists"
			} ;

		if (await _userManager.FindByNameAsync(request.UserName) is not null)
			return new AuthRes { Message= "UserName is already Exists" };

		var user = new ApplicationUser
		{
			FirstName = request.FirstName,
			LastName = request.LastName,
			Email = request.Email,
			UserName = request.UserName,
			EmailConfirmed = true,
		};

		var result = await _userManager.CreateAsync(user, request.Password);

		if (result.Succeeded)
		{
			var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

			code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

			await SendConfirmationEmail(user, code);
		}
		//var jwtSecurityToken = await CreateJwtToken(user);

		await _userManager.AddToRoleAsync(user, Consts.UserRole);

		return new AuthRes
		{
			Id = user.Id,	
			Email = request.Email,
			Roles = { Consts.UserRole },
			Password = request.Password,
			Username = request.UserName,
		};
	}
	public async Task<AuthRes> Login(LoginRequest request)
	{
		var response = new AuthRes();
		
		if ( await _userManager.FindByEmailAsync(request.Email) is not { } user)
			return new AuthRes { Message = "Email or password is invalid" };

		var result = await _signInManger.PasswordSignInAsync(user, request.Password, false, false);

		if (result.Succeeded)
		{
			var jwt = await CreateJwtToken(user);
			var roles = await _userManager.GetRolesAsync(user);

			response.Token = new JwtSecurityTokenHandler().WriteToken(jwt);
			response.IsAuthenticated = true;
			response.Email = user.Email!;
			response.ExpiryIn = jwt.ValidTo;
			response.Username = user.UserName!;
			response.Roles = [.. roles];

			return response;
		}
		else
		{
			response.Message = "invalid password or email";
			return response;
		}
	}


	public async Task<string> ConfirmEmail(ConfirmEmailRequest request)
	{
		if (await _userManager.FindByIdAsync(request.UserId) is not { } user )
			return "User is not found";

		if (user.EmailConfirmed)
			return "Email is Already Confirmed";


		var code = request.Code;
		try
		{
			code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
		}
		catch (Exception ex)
		{
			return $"This is invalid code /n{ex.Message}";
		}

		var result = await _userManager.ConfirmEmailAsync(user, code);

		if (result.Succeeded)
			return "Email is be Confirmed";

		var error = result.Errors.First();

		return $"{error.Code } \n {error.Description}";
	}
	public async Task ResendConfirmEmail(ResendConfirmEmail request)
	{
		var user = await _userManager.FindByEmailAsync(request.Email);
		if (user == null)
			return;

		var code =await _userManager.GenerateEmailConfirmationTokenAsync(user);

		_ = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

		await SendConfirmationEmail(user, code);
	}
	public async Task ForgetPassword(ForgetPasswordRequest request)
	{
		if(await _userManager.FindByEmailAsync(request?.Email!) is not { } user ) return;

		var code = await _userManager.GeneratePasswordResetTokenAsync(user);
		code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

		await SendResetPasswordEmail(user, code);

	}
	public async Task<string> ResetPassword(ResetPassword request)
	{
		var user = await _userManager.FindByEmailAsync(request.Email);
		if (user is null )
			return "Invalid Code";
		
		if (!user.EmailConfirmed)
		return "Email not confirmed";

		IdentityResult result;

		try
		{
			var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(request.Code));
			result = await _userManager.ResetPasswordAsync(user, code,request.NewPassword);
		}
		catch (FormatException)
		{
			result = IdentityResult.Failed(_userManager.ErrorDescriber.InvalidToken());
		}

		if (result.Succeeded)
			return "Reseed is Succeed";

		var error = result.Errors.First();

		return $"{error.Code} \n{error.Description}";
	}
	private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
	{
		var userClaims = await _userManager.GetClaimsAsync(user);
		var roles = await _userManager.GetRolesAsync(user);
		var roleClaims = new List<Claim>();

		foreach (var role in roles)
			roleClaims.Add(new Claim("roles", role));

		var claims = new List<Claim> {
		new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
		new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
		new Claim(JwtRegisteredClaimNames.Email,user.Email!),
		new Claim("uid",user.Id)
		}.Union(userClaims).Union(roleClaims);

		var symmetric = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
		var signingKey = new SigningCredentials(symmetric, SecurityAlgorithms.HmacSha256);

		var jwtSecurityToken = new JwtSecurityToken(
			issuer: _jwt.Issuer,
			audience: _jwt.Audience,
			expires: DateTime.UtcNow.AddDays(_jwt.DurationInDays),
			claims: claims,
			signingCredentials: signingKey
			);
		return jwtSecurityToken;
	}
	public async Task SendConfirmationEmail(ApplicationUser user,string code)
	{
		var origin = _contextAccessor.HttpContext?.Request.Headers.Origin;
		var emailBody = GenerateEmailBody("EmailConfirmation", templateModel: new Dictionary<string, string>
						{
								{ "{{name}}", user.FirstName },
										{ "{{action_url}}", $"{origin}/auth/emailConfirmation?userId={user.Id}&code={code}" }
						}
				);
		await _mailService.SendEmailAsync("abubakeryousif01@gmail.com", "✅ Alty Api: Email Confirmation", emailBody);
	}
	public async Task SendResetPasswordEmail(ApplicationUser user, string code)
	{
		var origin = _contextAccessor.HttpContext?.Request.Headers.Origin;
		var emailBody = GenerateEmailBody(nameof(ForgetPassword), templateModel: new Dictionary<string, string>
						{
								{ "{{name}}", user.FirstName },
										{ "{{action_url}}", $"{origin}/auth/ReseedPassword?email={user.Email}&code={code}" }
						}
				);
		await _mailService.SendEmailAsync("abubakeryousif01@gmail.com", "✅ Alty Api: Forget Password", emailBody);
	}
	public static string GenerateEmailBody(string template, Dictionary<string, string> templateModel)
	{
		var templatePath = $"{Directory.GetCurrentDirectory()}/Templates/{template}.html";
		var streamReader = new StreamReader(templatePath);
		var body = streamReader.ReadToEnd();
		streamReader.Close();

		foreach (var item in templateModel)
			body = body.Replace(item.Key, item.Value);

		return body;
	}

	
}