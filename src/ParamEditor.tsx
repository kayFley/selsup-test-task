import React from 'react'
import './ParamEditor.css'

interface Color {
	id: number
	name: string
}

interface Param {
	id: number
	name: string
	type: 'string'
}

interface ParamValue {
	paramId: number
	value: string
}

interface Model {
	paramValues: ParamValue[]
	colors: Color[]
}

interface Props {
	params: Param[]
	model: Model
}

interface State {
	editedParams: { [key: number]: string }
}

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		const editedParams: { [key: number]: string } = {}
		props.params.forEach(param => {
			const paramValue = props.model.paramValues.find(
				pv => pv.paramId === param.id,
			)
			editedParams[param.id] = paramValue ? paramValue.value : ''
		})
		this.state = { editedParams }
	}

	handleParamChange = (paramId: number, value: string) => {
		this.setState(prevState => ({
			editedParams: {
				...prevState.editedParams,
				[paramId]: value,
			},
		}))
	}

	public getModel(): Model {
		const { params } = this.props
		const { editedParams } = this.state

		const paramValues = params.map(param => ({
			paramId: param.id,
			value: editedParams[param.id],
		}))

		return { paramValues, colors: [] }
	}

	render() {
		const { params } = this.props
		const { editedParams } = this.state

		return (
			<div className='param-editor-container'>
				{params.map(param => (
					<div key={param.id} className='param-editor-item'>
						<label className='param-editor-label'>{param.name}</label>
						<input
							type='text'
							value={editedParams[param.id]}
							onChange={e => this.handleParamChange(param.id, e.target.value)}
							className='param-editor-input'
						/>
					</div>
				))}
			</div>
		)
	}
}

export default ParamEditor
