import Todo from "../models/Todo";
import { Request, Response } from 'express';


export const getAllTodos = async(req: Request, res: Response): Promise<void> => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, completed } = req.body;
        const newTodo = new Todo({
            title,
            completed: completed ?? false,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(400).json({message: err.message});
        } else  {
            res.status(400).json({ message: "An uknown error occupied" });
        }
    }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try  {
        const { id } = req.params;
        const update = req.body;
        const options = { new: true};

        const updatedTodo = await Todo.findByIdAndUpdate(id, update, options);
        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.json(updatedTodo);
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
};



