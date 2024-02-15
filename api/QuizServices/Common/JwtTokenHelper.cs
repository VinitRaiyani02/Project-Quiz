using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Entities.Models;
using Microsoft.IdentityModel.Tokens;

namespace QuizServices.Common
{
    public class JwtTokenHelper
    {
        public static string GenerateToken(JwtSetting jwtSetting, UserModel sessionUser)
        {
            if (jwtSetting == null)
                return string.Empty;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSetting.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, sessionUser.UserName),
                new Claim(ClaimTypes.NameIdentifier, sessionUser.Email),
                new Claim(ClaimTypes.Role, sessionUser.RoleId.ToString()),
                new Claim("CustomClaimForUser", JsonSerializer.Serialize(sessionUser))  // Additional Claims
            };

            var token = new JwtSecurityToken(
                jwtSetting.Issuer,
                jwtSetting.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(15), // Default 5 mins, max 1 day
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
