import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) {
    const { email } = body;
    const userId = email;

    this.transactionsService.initializeForUser(userId);

    return {
      access_token: 'fake-jwt-token-' + Math.random().toString(36).substring(7),
      user: {
        id: userId,
        name: 'Usuário de Teste',
        email: email || 'teste@exemplo.com',
      },
    };
  }
}
