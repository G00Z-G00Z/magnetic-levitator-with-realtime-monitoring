import { JWTUserPayload } from 'src/auth/interfaces';
import { WebSocketAuthService } from './web-socket-auth.service';


export class WebSocketUserAuthService extends WebSocketAuthService<JWTUserPayload> {
    protected getPayload(token: string): JWTUserPayload {
        return this.authService.checkValidUserToken(token);
    }
}

