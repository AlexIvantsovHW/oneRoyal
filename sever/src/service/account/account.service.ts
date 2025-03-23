import { AppDataSource } from "../../config/database";

import { Repository } from "typeorm";
import { Account } from "../../modules/accounts/entities/account.entity";

export class AccountService {
  private accountRepository: Repository<Account>;
  constructor() {
    this.accountRepository = AppDataSource.getRepository(Account);
  }
  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
  async findByUserId(user_id: number): Promise<Account[]> {
    return await this.accountRepository.find({ where: { user_id } });
  }
}
