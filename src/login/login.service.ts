import { Injectable } from '@nestjs/common'
import { $ } from 'zx'
import { CreateLoginDto } from './dto/create-login.dto'
import { UpdateLoginDto } from './dto/update-login.dto'

@Injectable()
export class LoginService {
  create(createLoginDto: CreateLoginDto) {
    console.log(createLoginDto)
    return 'This action adds a new login'
  }

  async findAll() {
    const list = await $`ls -la`.text()
    return list
  }

  findOne(id: number) {
    return `This action returns a #${id} login`
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    console.log(updateLoginDto)
    return `This action updates a #${id} login`
  }

  remove(id: number) {
    return `This action removes a #${id} login`
  }
}
