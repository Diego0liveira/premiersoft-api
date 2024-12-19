export interface KafkaResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}
