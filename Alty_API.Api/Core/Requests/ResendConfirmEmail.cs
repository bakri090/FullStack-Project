using System.ComponentModel.DataAnnotations;

namespace Core.Requests;
public class ResendConfirmEmail
{
	[Required,EmailAddress]
	public string Email { get; set; } = string.Empty;
}
