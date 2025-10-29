export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Candidature {
  id?: number;
  title: string;
  company: string;
  status: string;
  link: string;
  dateApplied: string;
  note: string;
}

export interface AuthRequest {
  password: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}
