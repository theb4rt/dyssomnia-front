import TaskService from '../taskService';

type LaunchScanData = {
    targetUrl: string;
    timeout?: number;

};

class NiktoService extends TaskService {
    get prefix() {
        return '/api/v1';
    }

    launchScan({
                   targetUrl,
                   timeout = 40,
               }: LaunchScanData) {
        return this.http('/web/nikto', {
            method: 'POST',
            body: {
                host: targetUrl,
                maxTime: timeout,
            },
        });
    }
}

export default NiktoService;
