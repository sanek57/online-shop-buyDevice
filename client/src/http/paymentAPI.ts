import type { AxiosResponse } from 'axios'
import { $authHost } from '.'

export const buyNow = async (
  userId: number,
  deviceId: string,
  value: string
): Promise<AxiosResponse> => {
  const response = await $authHost.post<AxiosResponse>('api/payment/pay', {
    userId,
    orderId: deviceId,
    value,
  })

  return response
}
