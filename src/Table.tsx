import React from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import 'primeicons/primeicons.css';

import Task from './model/Task';
import TaskService from './service/TaskService';

const Table = () => {
    let _newTask: Task = { id: '', title: '', description: '', status: 'TODO' }

    const [newTask, setNewTask] = React.useState<Task>(_newTask);
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [statuses] = React.useState<string[]>(['TODO', 'IN_PROGRESS', 'DONE']);
    const [savedTask, setSavedTask] = React.useState<boolean>(false);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    React.useEffect(() => {
        TaskService.getAllTasks()
            .then((tasks) => setTasks(tasks))
            .catch(err => console.error(err));
    }, []);

    const getStatus = (value: string) => {
        switch (value) {
            case 'DONE':
                return 'success';
            case 'IN_PROGRESS':
                return 'warning';
            case 'TODO':
                return 'danger';
            default:
                return null;
        }
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _tasks = [...tasks];
        let { newData, index } = e;
        let _updatedTask = newData as Task;

        _tasks[index] = _updatedTask;

        setTasks(_tasks);

        TaskService.updateTask(_updatedTask)
            .then(() => setTasks(_tasks))
            .catch((e) => console.error("Updating location failed: ", e))
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };

    const statusEditor = (options: ColumnEditorOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getStatus(option)}></Tag>;
                }}
            />
        );
    };

    const renderStatus = (rowData: Task) => {
        return <Tag value={rowData.status} severity={getStatus(rowData.status)}></Tag>;
    };

    const openNew = () => {
        setNewTask(_newTask);
        setSavedTask(false);
        setOpenDialog(true);
    };

    const hideDialog = () => {
        setSavedTask(false);
        setOpenDialog(false);
    };

    const saveNewTask = () => {
        setSavedTask(true);

        if (newTask.title.trim()) {
            let _tasks = [...tasks];
            let _task = { ...newTask } as Task;

            TaskService.addTask(_task).then((resp) => {
                 _tasks.push(resp as Task);
                setTasks(_tasks);
                setNewTask(_newTask);
            }).catch((e) => console.error(e))
            .finally(() => setOpenDialog(false));
        }
    }

    const addNewTaskFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveNewTask} />
        </React.Fragment>
    );

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
        const val = (e.target && e.target.value) || '';
        let _task = { ...newTask } as Task;

        _task.title = val as string;

        setNewTask(_task);
    };

    const deleteRow = (rowData: Task) => {
        TaskService.deleteTask(rowData.id)
            .then(() => {
                console.log(`Deleted Task: ${rowData.title}`);
                let _tasks = tasks.filter((task) => task.id !== rowData.id);
                setTasks(_tasks);
            }).catch((e) => console.error(e));
    };

    const deleteButton = (rowData: Task) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => deleteRow(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className='card'>
            <div>
                <h1>Task Manager</h1>
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
            <div>
                <DataTable value={tasks} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} size='small' tableStyle={{ width: '70rem' }}>
                    <Column field="id" header="ID" style={{ width: '20%' }}></Column>
                    <Column field="title" header="title" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="description" header="Description" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="status" header="Status" body={renderStatus} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
                    <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column body={deleteButton} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={openDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add New Task" modal className="p-fluid" footer={addNewTaskFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <InputText id="title" value={newTask.title} onChange={(e) => onTitleChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': savedTask && !newTask.title })} />
                    {savedTask && !newTask.title && <small className="p-error">Title is required.</small>}
                </div>
            </Dialog>
        </div>
    );
};

export default Table;