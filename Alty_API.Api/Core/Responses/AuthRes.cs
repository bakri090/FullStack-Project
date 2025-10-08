namespace Core.Responses;
public class AuthRes
{
	public string Id { get; set; } = string.Empty;
	public string Message { get; set; } = string.Empty;
	public string Username { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
	public List<string> Roles { get; set; } = [];
	public string Token {  get; set; } = string.Empty;
	public DateTime ExpiryIn { get; set; } 
	public bool IsAuthenticated { get; set; }
	public string Password { get; set; } = string.Empty;
}
