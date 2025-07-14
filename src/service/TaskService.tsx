import Task from '../model/Task';
import { get, put, post, remove } from './http';

const TaskService = {
    async getAllTasks() {
        return await get()
    },
    async addTask(task: Task) {
        return await post(task)
    },
    async updateTask(task: Task) {
        console.log("Updating Task", task);
        return await put(task)
    },
    async deleteTask(id: string) {
        return await remove(id)
    }
};

export default TaskService;