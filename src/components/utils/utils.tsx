import { getUserByEmail } from '@/service/service';
import { User } from '@/types/types';
import { jwtDecode } from 'jwt-decode';

export class Utils {

    static async getEmailByToken(token: string): Promise<User | undefined> {
        try {
            const decodedToken: any = jwtDecode(token);
            const email = decodedToken.email;
            const response = await getUserByEmail(email);
            return response.data.data;
        } catch {
            return undefined;
        }
    }
}
