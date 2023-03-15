import { JWTDevicesPayload } from 'src/auth/interfaces';
import { WebSocketAuthService } from './web-socket-auth.service';

export class WebSocketDeviceAuthService extends WebSocketAuthService<JWTDevicesPayload> {
    protected getPayload(token: string): JWTDevicesPayload {
        return this.authService.checkValidDeviceToken(token);
    }
}

