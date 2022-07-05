import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { SignUpDto } from './dto';
// import { RoleRepository } from '../role/role.repository';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signupDto: SignUpDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;

    //   const roleRepository: RoleRepository = await getConnection().getRoleRepository()
  }
}
