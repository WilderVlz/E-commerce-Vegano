export interface LoginResponse
{
  "codeStatus": number;
  "message": string;
  "accessToken"?: string;
  "refreshToken"?: string;
}
