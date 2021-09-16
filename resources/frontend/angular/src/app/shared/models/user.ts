export interface User {
  access_token?: string;
  expires_at?: string;
  token_type?: string;
  user?: {
    id?: number;
    name?: string;
    username?: string;
    created_at?: string;
    email?: string;
    email_verified_at?: string;
    updated_at?: string;
    role?: number;
    empleado_id?: number;
    userimage?: string;
  }
}
