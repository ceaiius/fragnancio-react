import api from '@/lib/api';


export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  current_password?: string;
}

export async function updateUser(payload: UpdateUserPayload, token: string) {
  const response = await api.put(
    `/update-credentials`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
} 