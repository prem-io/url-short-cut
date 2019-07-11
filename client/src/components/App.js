import React from 'react';
import axios from '../config/config'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            hash: false
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        e.persist()
        console.log(e.target.id, e.target.value)
        this.setState(() => ({
            [e.target.id]: e.target.value
        }))
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            original_url: this.state.url
        }
        console.log(formData)
        this.setState({ hash: true })
    }

    render() {
        console.log(this.state.hash)
        return (
            <div className="container" style={{marginTop: '15em'}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">https://</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            value={this.state.url}
                            onChange={this.handleChange}
                            placeholder="www.dct-academy.com"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">Short it!!</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}