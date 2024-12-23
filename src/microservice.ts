import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { AppModule } from './app.module';

async function bootstrap() {

  const configKafka = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'nestjs-consumer-group',
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  } as MicroserviceOptions;

  const app = await NestFactory.createMicroservice(AppModule, configKafka);

  console.log('Kafka Consumer Microservice is running...');

  await app.listen();
}
bootstrap();
