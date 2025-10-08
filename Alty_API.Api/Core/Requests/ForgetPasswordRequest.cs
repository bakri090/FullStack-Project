using System.ComponentModel.DataAnnotations;

namespace Core.Requests;
public class ForgetPasswordRequest
{
	[EmailAddress,Required]
	public string Email { get; set; } = string.Empty;
}
