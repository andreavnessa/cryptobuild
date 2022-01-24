import React, { Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            valor: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCrypto = this.addCrypto.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    addCrypto(e) {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Guardar Cryptomoneda'});
                this.setState({nombre:'', valor:''});
                this.fetchTasks();

            })
            .catch(err => console.error(err));
        e.preventDefault();
    }
    deleteCrypto(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',        
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: "Crypto borrada"});
            this.fetchTasks();
        })
    }    

    componentDidMount(){
        this.fetchTasks();
    }


    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks); 
            });
    }


    render() {
        return (
            <div>
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href="/">CryptoBuild</a>                        
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addCrypto}>
                                        <div className='row'>
                                            <div className='input-field col s12'> 
                                            <input name="nombre" 
                                            onChange={this.handleChange} 
                                            type="text" 
                                            placeholder="Ingrese el nombre de su cryptomoneda"
                                            value={this.state.nombre} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'> 
                                            <input name="valor" 
                                            onChange={this.handleChange} 
                                            type="text" 
                                            placeholder="Ingrese el valor de su cryptomoneda" 
                                            value={this.state.valor} />
                                            </div>
                                        </div>
                                        <button type='submit' className='btn light-blue darken-4'>
                                            Aceptar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>       
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>
                                                        {task.nombre}
                                                    </td>
                                                    <td>
                                                        {task.valor} USD
                                                    </td>
                                                    <td>
                                                        <button className='btn light-blue darken-4'
                                                        onClick={() => this.deleteCrypto(task._id)}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>                     
                        </div>
                    </div>                
                </div>
            </div>
        )
    }
}
export default App;

