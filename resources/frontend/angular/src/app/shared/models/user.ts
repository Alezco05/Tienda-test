export interface User {
  access_token?: string;
  expires_at?: string;
  token_type?: string;
  user?: Usuario;
}

export interface Usuario {
  id?: number;
  name?: string;
  username?: string;
  created_at?: string;
  email?: string;
  email_verified_at?: string;
  updated_at?: string;
  role?: string;
  empleado_id?: number;
  userimage?: string;
}
