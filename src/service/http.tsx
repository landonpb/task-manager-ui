import axios, { AxiosResponse } from 'axios';

import Task from '../model/Task';

const BASE_URL = 'http://localhost:8080/tasks';

export const get = async () => {
    try {
        const response: AxiosResponse<Task[]> = await axios.get(BASE_URL);
        const tasks: Task[] = response.data;
        tasks.forEach((task) => console.log(task));
        return tasks;
    } catch (error) {
        // Handle any errors during the request
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
        return [];
    }
};

export const put = async (payload: Task) => {
    try {
        const response: AxiosResponse<Task> = await axios.put(`${BASE_URL}/${payload.id}`, payload);
        const task: Task = response.data;
        console.log(task)
        return task;
    } catch (error) {
        // Handle any errors during the request
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
        return null;
    }
};

export const post = async (payload: Task) => {
    try {
        const response: AxiosResponse<Task> = await axios.post(BASE_URL, payload);
        const task: Task = response.data;
        console.log(task)
        return task;
    } catch (error) {
        // Handle any errors during the request
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
        return null;
    }
};

export const remove = async (id: string) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        // Handle any errors during the request
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
    }
};