import React, {useState, useEffect} from 'react'
import { 
    Table, 
    Tag, 
    Space,
    Button,
	Modal,
	Form, 
	Input 
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import api from '../utils/api'

const Listagem = ()=> {
    const [state, setState] = useState({
        dataSource: [],
        isLoading: false,
        modalVisible: false,
        initialValues: {},
        isEdit: false
    })

	const validateMessages = {
		required: '${label} é obrigatório!',
		types: {
			email: '${label} não é um email valido'
		}
    }
    
    const remove = async(id)=> {
        setState(prev=>({...prev, isLoading: true}))
        try{
            let res = await api.delete(`cadastro/${id}`)
            if(res.status === 200) list()
        }catch(e){
            console.log("DELETE - error", e);
        }
        setState(prev=>({...prev, isLoading: false}))
    }

    const save = async(data)=> {
        setState(prev=>({...prev, isLoading: true}))
        try{
            let res = state.isEdit ? await api.patch(`cadastro/${state.initialValues.id}`, data) : await api.post(`cadastro`, data)
            if(res.status === 200 || res.status === 201) {
                list()
                setState(prev=>({...prev, modalVisible: false, isEdit: false}))
            }
        }catch(e){
            console.log("SAVE - error", e);
        }
        setState(prev=>({...prev, isLoading: false}))
    }

    const list = async() => {
        setState(prev=>({...prev, isLoading: true}))
        try{
            let response = await api.get("cadastro")
            if(response.status === 200){
                response.data.map(v=>{
                    console.log(v);
                    v.opcoes = 
                    <div style={{display: "flex"}}>
                        <div style={{width: "30%"}}>
                            <EditOutlined onClick={()=>setState(prev=>({...prev, isEdit: true, modalVisible: true, initialValues: v}))}/>
                        </div>
                        <div style={{width: "30%"}}>
                            <DeleteOutlined onClick={()=>remove(v.id)}/>
                        </div>
                    </div>
                })
                console.log(response.data);
                setState(prev=>({...prev, dataSource: response.data}))
            }
        }catch(e){
            console.log("error", e);
        }
        setState(prev=>({...prev, isLoading: false}))
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
        },
        {
            title: 'Opções',
            dataIndex: 'opcoes',
            key: 'opcoes',
        }
    ];


    return(
        <div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    height: 48
                }}
            >
                <Button type="primary" onClick={()=>setState(prev=>({...prev, modalVisible: true}))}>Adicionar</Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={state.dataSource} 
                loading={state.isLoading ? true : false}
            />
            <Modal 
				title="Formulário" 
                visible={state.modalVisible} 
                onOk={()=>{}} 
                onCancel={()=>setState(prev=>({...prev, modalVisible: false}))} 
				okButtonProps={{style: {display: "none"}}}
				cancelButtonProps={{style: {display: "none"}}}
			>
                <Form 
                    onFinish={(e)=>{
                        save(e)
                    }} 
                    validateMessages={validateMessages} 
                    layout='vertical' 
                    initialValues={state.initialValues}
                >
					<Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
						<Input style={{width: "100%"}}/>
					</Form.Item>
					<Form.Item name="sexo" label="Sexo" rules={[{ required: true }]}>
						<Input style={{width: "100%"}}/>
					</Form.Item>
					<Form.Item name="telefone" label="Telefone" rules={[{ required: true }]}>
						<Input style={{width: "100%"}}/>
					</Form.Item>
					<Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
						<Input style={{width: "100%"}}/>
					</Form.Item>
					<Form.Item style={{marginTop: 24}}>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "flex-end"
							}}
						>
							<Button type="primary" htmlType="submit">
								Salvar
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>
        </div>
    )
}

export default Listagem