export interface LoginResult {
  isSuccess: boolean;
  errorMessage?: string;
  customer?: { id: number; name: string; email: string; mobile: string };
}
