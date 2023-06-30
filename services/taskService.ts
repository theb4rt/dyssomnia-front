import Service from './service';
import config from '../config';

class TaskService extends Service {
    constructor(token: string | undefined | null = null) {
        super(token, config.api_task_url);
    }
}

export default TaskService;
