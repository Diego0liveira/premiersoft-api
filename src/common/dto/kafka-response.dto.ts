/**
 * KafkaResponseDto
 * 
 * DTO para respostas de eventos Kafka.
 * 
 * @class KafkaResponseDto
 * 
 * @template T
 * 
 * @property {string} status - Status da resposta.
 * @property {string} message - Mensagem da resposta.
 * @property {T} data - Dados da resposta.
 * @property {string} error - Erro da resposta.
 * 
 */
export class KafkaResponseDto<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;

  constructor(
    status: 'success' | 'error',
    message: string,
    data?: T,
    error?: string,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
