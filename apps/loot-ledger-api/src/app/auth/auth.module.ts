import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  controllers: [AuthController],
})
export class AuthModule {}
