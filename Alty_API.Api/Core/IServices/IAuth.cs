using Core.Requests;
using Core.Responses;

namespace Core.Interfaces;
public interface IAuth
{
	Task<AuthRes> Register(RegisterRequest request);
	Task<AuthRes> Login(LoginRequest request);
	Task<string> ConfirmEmail(ConfirmEmailRequest request);
	Task ResendConfirmEmail(ResendConfirmEmail request);
	Task ForgetPassword(ForgetPasswordRequest request);
	Task<string> ResetPassword(ResetPassword request);
}
