import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaResponseDto } from 'src/common/dto/kafka-response.dto';
import {
  kafkaMessageTypes,
  KafkaTopics,
} from 'src/common/enum/kafka-topics.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

/**
 * Controller responsável por lidar com eventos Kafka relacionados a usuários.
 * 
 * @class UserKafkaConsumerController
 * 
 * @description Esta classe contém listeners para eventos Kafka relacionados a operações de CRUD de usuários.
 * 
 */
@Controller()
export class UserKafkaConsumerController {
  private readonly logger = new Logger(UserKafkaConsumerController.name);

  constructor(private readonly userService: UserService) {}

  /**
    * @method handleCreateUser
    * @description Listener para criar usuário.
    * @param {any} message - Mensagem recebida do evento Kafka.
    * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
    * @eventPattern {KafkaTopics.USER_CREATED} - Tópico Kafka para criação de usuário.
   * 
   */
  @EventPattern(KafkaTopics.USER_CREATED)
  async handleCreateUser(@Payload() message: any) {
    this.logger.log(`Received create_user event: ${JSON.stringify(message.value)}`);
    const { name, email, role } = message.value;

    try {
      const createUserDto = new CreateUserDto({ name, email, role });
      const newUser = await this.userService.create(createUserDto);
      this.logger.log(`User created successfully: ${JSON.stringify(newUser)}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'User created successfully',
        newUser,
      );
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error creating user: ${error.message}`,
        null,
        error.message,
      );
    }
  }

  /**
    * @method handleUpdateUser
    * @description Listener para atualizar usuário.
    * @param {any} message - Mensagem recebida do evento Kafka.
    * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
    * @eventPattern {KafkaTopics.USER_UPDATED} - Tópico Kafka para atualização de usuário.
   */
  @EventPattern(KafkaTopics.USER_UPDATED)
  async handleUpdateUser(@Payload() message: any) {
    this.logger.log(`Received update_user event: ${JSON.stringify(message.value)}`);
    const { id, name, email, role } = message.value;
    const data = { name, email, role };

    try {
      const updatedUser = await this.userService.update(id, data);
      this.logger.log(`User updated successfully: ${JSON.stringify(updatedUser)}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'User updated successfully',
        updatedUser,
      );
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error updating user: ${error.message}`,
        null,
        error.message,
      );
    }
  }

  /**
    * @method handleGetUsers
    * @description Listener para obter todos os usuários.
    * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
    * @eventPattern {KafkaTopics.GET_USERS} - Tópico Kafka para obter todos os usuários.
   */
  @EventPattern(KafkaTopics.GET_USERS)
  async handleGetUsers() {
    this.logger.log(`Received get_users event`);

    try {
      const users = await this.userService.findAll();
      this.logger.log(`Retrieved users: ${JSON.stringify(users)}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'Users retrieved successfully',
        users,
      );
    } catch (error) {
      this.logger.error(`Error retrieving users: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error retrieving users: ${error.message}`,
        null,
        error.message,
      );
    }
  }

  /**
    * @method handleGetUser
    * @description Listener para obter usuário por ID.
    * @param {any} message - Mensagem recebida do evento Kafka.
    * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
    * @eventPattern {KafkaTopics.GET_USER} - Tópico Kafka para obter usuário por ID.
   */
  @EventPattern(KafkaTopics.GET_USER)
  async handleGetUser(@Payload() message: any) {
    this.logger.log(`Received get_user event: ${JSON.stringify(message.value)}`);
    const { id } = message.value;

    try {
      const user = await this.userService.findById(id);
      this.logger.log(`Retrieved user: ${JSON.stringify(user)}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'User retrieved successfully',
        user,
      );
    } catch (error) {
      this.logger.error(`Error retrieving user: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error retrieving user: ${error.message}`,
        null,
        error.message,
      );
    }
  }

  /**
    * @method handleDeleteUser
    * @description Listener para deletar usuário.
    * @param {any} message - Mensagem recebida do evento Kafka.
    * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
    * @eventPattern {KafkaTopics.USER_DELETED} - Tópico Kafka para deletar usuário.
   */
  @EventPattern(KafkaTopics.USER_DELETED)
  async handleDeleteUser(@Payload() message: any) {
    this.logger.log(`Received delete_user event: ${JSON.stringify(message.value)}`);
    const { id } = message.value;

    try {
      await this.userService.delete(id);
      this.logger.log(`User with ID ${id} deleted successfully.`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'User deleted successfully',
        null,
      );
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error deleting user: ${error.message}`,
        null,
        error.message,
      );
    }
  }

  /**
   * @method handleFilterUsers
   * @description Listener para filtrar usuários.
   * @param {any} message - Mensagem recebida do evento Kafka.
   * @returns {Promise<KafkaResponseDto>} Resposta do evento Kafka.
   * @eventPattern {KafkaTopics.USER_FILTERED} - Tópico Kafka para filtrar usuários.
   */
  @EventPattern(KafkaTopics.USER_FILTERED)
  async handleFilterUsers(@Payload() message: any) {
    this.logger.log(`Received filter_users event: ${JSON.stringify(message.value)}`);
    const { field, value } = message.value;

    try {
      const filteredUsers = await this.userService.filterByField(field, value);
      this.logger.log(`Filtered users: ${JSON.stringify(filteredUsers)}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.SUCCESS,
        'Users filtered successfully',
        filteredUsers,
      );
    } catch (error) {
      this.logger.error(`Error filtering users by ${field}=${value}: ${error.message}`);
      return new KafkaResponseDto(
        kafkaMessageTypes.ERROR,
        `Error filtering users by ${field}=${value}: ${error.message}`,
        null,
        error.message,
      );
    }
  }
}
