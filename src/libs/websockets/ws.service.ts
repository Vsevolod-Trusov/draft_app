import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4321)
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    this.server.emit('room', client.id + ' joined!');
  }

  handleDisconnect(client: Socket): void {
    this.server.emit('room', client.id + ' left!');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any): void {
    this.server.emit('room', `[${client.id}] -> ${JSON.stringify(message)}`);
  }
}
