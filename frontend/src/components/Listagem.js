import React, {useState, useEffect} from 'react'
import { Table, Tag, Space } from 'antd'
import api from '../utils/api'
import Dummy from './dummy'

const Listagem = ()=> {
    const [state, setState] = useState({
        dataSource: []
    })

    const list = async() => {
        try{
            let response = await api.get("cadastro")
            if(response.status === 200) setState({dataSource: response.data})
        }catch(e){
            console.log("error", e);
        }
    }

    useEffect(()=>{
        list()
    }, [])

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',
            key: 'sexo',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }
    ];


    return(
        <Table 
            columns={columns} 
            dataSource={state.dataSource} 
        />
    )
}

export default Listagem