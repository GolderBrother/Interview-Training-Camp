import React from 'react';
import ReactDOM from 'react-dom';

import axios from './axios';
class A extends React.Component {
	state = {
		name: ''
	};
	render() {
		let { name } = this.state;
		return <>
			姓名:<span>{name}</span>
			<br />
			<input type="text" value={name} onChange={ev => {
				this.setState({
					name: ev.target.value
				});
			}} />
		</>;
	}
	async componentDidMount() {
		setTimeout(_ => {
			this.setState({
				name: '珠峰培训'
			});
		}, 1000);

		let data = await axios.get('/product/banner');
		console.log(data);
	}
}


ReactDOM.render(<>
	<A />
</>, document.getElementById('root'));