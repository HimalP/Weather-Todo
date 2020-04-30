import axios from 'axios';

const url = 'http://localhost:5000/todos';

class Model {
    static getTodos() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(url).then((res) => {
                    resolve(
                        res.data.map((todo) => ({
                            ...todo,
                        }))
                    );
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static addTodo(todoItem) {
        return axios.post(url, {
            todo: todoItem,
        });
    }

    static deleteTodo(id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default Model;
